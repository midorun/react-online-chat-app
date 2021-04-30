import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const CONTACTS_LOCAL_STORAGE_KEY = 'contacts'

const ContactsContext = React.createContext()

export const useContacts = () => useContext(ContactsContext)

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage(CONTACTS_LOCAL_STORAGE_KEY, [])

  const createContact = (id, name) => {
    setContacts(prev => [...prev, { id, name }])
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  )
}

