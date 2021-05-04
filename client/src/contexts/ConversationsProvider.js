import React, { useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider'

const CONVERSATIONS_LOCAL_STORAGE_KEY = 'conversations'

const ConversationsContext = React.createContext()

export const useConversations = () => useContext(ConversationsContext)

const ConversationsProvider = ({ children }) => {
  const [conversations, setConversations] = useLocalStorage
    (CONVERSATIONS_LOCAL_STORAGE_KEY, [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const { contacts } = useContacts()

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(recipient => {
      const { id, name } = contacts.find(contact => recipient === contact.id)
      return {
        id,
        name
      }
    })

    return {
      ...conversation,
      recipients,
      selected: selectedConversationIndex === index
    }
  })

  const createConversation = (recipients) => {
    setConversations(prev => [...prev, { recipients, messages: [] }])
  }

  const deleteConversation = (index) => {
    setConversations(prev => prev.filter((conversation, i, conversations) => conversations.indexOf(conversation) !== index))
  }

  const value = {
    conversations: formattedConversations,
    deleteConversation,
    createConversation,
    selectConversationIndex: setSelectedConversationIndex,
    selectedConversation: formattedConversations[selectedConversationIndex]
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}

export default ConversationsProvider
