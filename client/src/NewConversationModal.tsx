import React, { useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { ContactType, useContacts } from './contexts/ContactsProvider'
import { useConversations } from './contexts/ConversationsProvider'

type Props = {
  closeModal: () => void
}

const NewConversationModal: React.FC<Props> = ({ closeModal }) => {
  const [selectedContactsIds, setSelectedContactsIds] = useState<Array<string>>([])
  const { contacts } = useContacts()
  const { createConversation } = useConversations()

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    createConversation(selectedContactsIds.map(id => {
      return contacts.find((contact: ContactType) => contact.id === id)
    }))

    closeModal()
  }

  const handleCheckboxChange = (contactId: string) => {
    setSelectedContactsIds(prev => {
      if (prev.includes(contactId)) {
        return prev.filter(prevId => contactId !== prevId)
      } else {
        return [...prev, contactId]
      }
    })
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          Добавить контакт
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit} className="d-flex flex-column">
          {contacts.map(contact => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                label={contact.name}
                // value={selectedContactsIds.includes(contact.id)}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit" className="justify-content-center" >Добавить</Button>
        </Form>
      </Modal.Body>
    </>
  )
}

export default NewConversationModal
