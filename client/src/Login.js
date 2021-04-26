import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'


export default function Login() {
  return (
    <Container
      className='d-flex align-items-center'
      style={{
        height: `100vh`
      }}
    >
      <Form>
        <Form.Group>
          <Form.Label>Ваш айди</Form.Label>
          <Form.Control type='text' placeholder='Введите ваш айди в это поле' />
        </Form.Group>
        <Button variant='primary' className='mr-2'>Войти</Button>
        <Button variant='secondary'>Сгенерировать новый айди</Button>
      </Form >
    </Container>
  )
}
