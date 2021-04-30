import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from './contexts/ContactsProvider'

const NewContactsModal = ({ closeModal }) => {
  const idRef = useRef()
  const nameRef = useRef()
  const { createContact } = useContacts()

  const handleFormSubmit = (e) => {
    e.preventDefault()
    createContact(idRef.current.value, nameRef.current.value)
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
