import React, { useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { ContactType } from './ContactsProvider'
import { useSocket } from './SocketProvider'

type ConversationsContextType = {
  conversations: Array<ConversationType>,
  selectedConversation: ConversationType
  createConversation: (recipients: Array<ContactType | undefined>) => void,
  deleteConversation: (index: number) => void,
  sendMessage: (message: MessageType, conversation: ConversationType) => void,
  selectConversationIndex: (index: number) => void,
}

export type ConversationType = {
  recipients: Array<ContactType>,
  messages: Array<MessageType>,
  selected: boolean
}

export type MessageType = {
  senderId: string
  text: string
}

const CONVERSATIONS_LOCAL_STORAGE_KEY = 'conversations'

const ConversationsContext = React.createContext({} as ConversationsContextType)

export const useConversations = () => useContext(ConversationsContext)

const ConversationsProvider: React.FC = ({ children }) => {
  const [conversations, setConversations] = useLocalStorage
    (CONVERSATIONS_LOCAL_STORAGE_KEY, [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const socket = useSocket()

  // ! В коцце линтер просил добавить () не знаю зачем, потом разобраться 
  const createConversation = (recipients: Array<ContactType | undefined>) => {
    setConversations((prev: Array<ConversationType>) => [...prev, { recipients, messages: Array<MessageType>(), selected: false }])
  }

  const deleteConversation = (index: number) => {
    setConversations((prev: Array<ConversationType>) => prev.filter((conversation, i, conversations) => conversations.indexOf(conversation) !== index))
  }

  const addMessageToConversation = (message: MessageType, conversationToUpdate: ConversationType) => {
    setConversations((prevConversations: Array<ConversationType>) => prevConversations.map(conversation => {
      if (conversation.recipients === conversationToUpdate.recipients) {
        conversationToUpdate.messages.push(message)
      }
      return conversation
    }))
  }

  const sendMessage = (message: MessageType, conversationToUpdate: ConversationType) => {
    socket.emit('send-message', { message, conversationToUpdate })

    addMessageToConversation(message, conversationToUpdate)
  }

  const formattedConversations: Array<ConversationType> = conversations.map((conversation: Array<ConversationType>, i: number) => {
    return { ...conversation, selected: selectedConversationIndex === i }
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

function compareArrays(a: Array<any>, b: Array<any>) {
  if (a.length !== b.length) {
    return false
  } else {
    a.every((value, index) => value === b[index])
  }


}