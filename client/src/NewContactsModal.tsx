import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { ContactType, useContacts } from './contexts/ContactsProvider'

type Props = {
  closeModal: () => void
}

const NewContactsModal: React.FC<Props> = ({ closeModal }) => {
  const idRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const { createContact } = useContacts()

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createContact(
      {
        id: idRef?.current?.value,
        name: nameRef?.current?.value
      } as ContactType)
    closeModal()
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
          <Form.Group>
            <Form.Label>Айди</Form.Label>
            <Form.Control type="text" ref={idRef}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Имя</Form.Label>
            <Form.Control type="text" ref={nameRef}></Form.Control>
          </Form.Group>
          <Button type="submit" className="justify-content-center" >Добавить</Button>
        </Form>
      </Modal.Body>
    </>
  )
}

export default NewContactsModal
