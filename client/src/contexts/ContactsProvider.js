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

  const deleteContact = (index) => {
    setContacts(prev => prev.filter((contact, i, contacts) => contacts.indexOf(contact) !== index))
  }

  const value = {
    contacts,
    createContact,
    deleteContact
  }

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  )
}

