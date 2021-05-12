import { useContext, useState, createContext, FC, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { ContactType, useContacts } from './ContactsProvider'
import { useSocket } from './SocketProvider'


export type ConversationType = {
  recipients: Array<ContactType>,
  messages: Array<MessageType>,
  selected: boolean
}

export type MessageType = {
  senderId: string,
  senderName?: string
  text: string
  fromCurrentUser?: boolean
}

const CONVERSATIONS_LOCAL_STORAGE_KEY = 'conversations'

const ConversationsContext = createContext({} as ConversationsContextType)

export const useConversations = () => useContext(ConversationsContext)

type Props = {
  id: string
}

type ConversationsContextType = {
  conversations: Array<ConversationType>,
  selectedConversation: ConversationType
  createConversation: (recipients: Array<ContactType | undefined>) => void,
  deleteConversation: (index: number) => void,
  sendMessage: (message: MessageType, recipients: Array<ContactType>) => void,
  selectConversationIndex: (index: number) => void,
}

const ConversationsProvider: FC<Props> = ({ id, children }) => {
  const [conversations, setConversations] = useLocalStorage
    (CONVERSATIONS_LOCAL_STORAGE_KEY, [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const socket = useSocket()
  const { contacts } = useContacts()

  const createConversation = (recipients: Array<ContactType | undefined>) => {
    setConversations((prev: Array<ConversationType>) => [...prev, { recipients, messages: Array<MessageType>(), selected: false }])
  }

  const deleteConversation = (index: number) => {
    setConversations((prev: Array<ConversationType>) => prev.filter((conversation, i, conversations) => conversations.indexOf(conversation) !== index))
  }

  const addMessageToConversation = useCallback((message: MessageType, recipients: Array<ContactType>) => {

    setConversations((prevConversations: Array<ConversationType>) => {
      let isNewConversationNeeded = true
      const newMessage = message
      const newConversations = prevConversations.map((conversation: ConversationType) => {

        if (compareArrays(recipients, conversation.recipients)) {
          isNewConversationNeeded = false
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage]
          }
        }
        return conversation
      })

      if (isNewConversationNeeded) {
        return [...prevConversations,
        { recipients, messages: [newMessage] }]
      } else {
        return newConversations
      }
    })
  }, [setConversations])

  useEffect(() => {
    if (socket == null) return

    socket.on('receive-message', ((data: any) => addMessageToConversation(data.message, data.recipients))
    )

    return () => socket.off('receive-message')
  }, [socket, addMessageToConversation])

  const sendMessage = (message: MessageType, recipients: Array<ContactType>) => {
    socket.emit('send-message', { recipients, message })
    console.log(recipients);

    addMessageToConversation(message, recipients)
  }

  const formattedConversations: Array<ConversationType> = conversations.map((conversation: ConversationType, i: number) => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts.find(contact => recipient.id === contact.id)
      recipient.name = contact?.name || contact?.id
      return recipient
    })

    const messages = conversation.messages.map(message => {
      let { senderId, senderName } = message
      const contact = contacts.find((contact: ContactType) => contact.id === senderId)
      console.log(contact);

      const fromCurrentUser = id === senderId
      senderName = contact?.name || senderId

      return {
        ...message,
        senderName,
        fromCurrentUser
      }
    })
    return {
      ...conversation,
      recipients,
      messages,
      selected: selectedConversationIndex === i
    }
  })

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    deleteConversation,
    createConversation,
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}

export default ConversationsProvider

function compareArrays(a: Array<any>, b: Array<any>): boolean {
  if (a.length !== b.length) return false

  return a.every((element, index) => {
    return JSON.stringify(element) === JSON.stringify(b[index])
  })
}