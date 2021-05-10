import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

type ContactContextType = {
  contacts: Array<ContactType>,
  createContact: (contact: ContactType) => void,
  deleteContact: (index: number) => void
}

export type ContactType = {
  id: string,
  name?: string
}

const CONTACTS_LOCAL_STORAGE_KEY = 'contacts'

const ContactsContext = React.createContext({} as ContactContextType)

export const useContacts = () => useContext(ContactsContext)


export const ContactsProvider: React.FC = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage(CONTACTS_LOCAL_STORAGE_KEY, [])

  const createContact = (contact: ContactType): void => {

    setContacts((prev: Array<ContactType>) => [...prev, contact])
  }

  const deleteContact = (index: number) => {
    setContacts((prev: Array<ContactType>) => prev.filter((contact, i, contacts) => contacts.indexOf(contact) !== index))
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

