import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'

export default function Login({ onSubmit }) {
  const idInput = useRef()

  const handleFormSubmit = (e) => {
    e.preventDefault()
    onSubmit(idInput.current.value)
  }

  const generateNewId = () => {
    idInput.current.value = uuidv4()
  }

  return (
    <Container
      className='d-flex align-items-center'
      style={{
        height: `100vh`
      }}
    >
      <Form
        onSubmit={handleFormSubmit}
        className='w-100'
      >
        <Form.Group>
          <Form.Label>Ваш айди</Form.Label>
          <Form.Control ref={idInput} type='text' placeholder='Введите ваш айди в это поле' />
        </Form.Group>
        <Button type='submit' className='mr-2'>Войти</Button>
        <Button onClick={generateNewId} variant='secondary'>Сгенерировать новый айди</Button>
      </Form >
    </Container>
  )
}
