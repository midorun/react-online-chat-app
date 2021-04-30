import React, { useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { useContacts } from './contexts/ContactsProvider'
import { useConversations } from './contexts/ConversationsProvider'

const NewConversationModal = ({ closeModal }) => {
  const [selectedContactsIds, setSelectedContactsIds] = useState([])
  const { contacts } = useContacts()
  const { createConversation } = useConversations()

  const handleFormSubmit = (e) => {
    e.preventDefault()
    createConversation(selectedContactsIds)
    closeModal()
  }

  const handleCheckboxChange = (contactId) => {
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
                value={selectedContactsIds.includes(contact.id)}
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
