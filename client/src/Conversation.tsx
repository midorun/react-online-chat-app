import React, { useState } from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap';
import { ConversationType, useConversations } from './contexts/ConversationsProvider';

type Props = {
  currentUserId: string,
  currentConversation: ConversationType
}

const Conversation: React.FC<Props> = ({ currentUserId, currentConversation }) => {
  const [messageText, setMessageText] = useState('')
  const { sendMessage } = useConversations()

  // const { messages } = currentConversation

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // sendMessage({
    //   sender,
    //   text
    // }, ...recipients)
    setMessageText('')
  }

  // console.log(currentConversation.messages);
  return (
    <div className="d-flex flex-column ml-2" style={{ width: '500px' }}>
      <div className="d-flex overflow-auto flex-grow-1">

      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <InputGroup style={{ width: '400px', height: '65px' }}>
            <Form.Control
              as="textarea"
              placeholder="Введите текст сообщения"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              style={{ resize: "none" }}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <InputGroup.Append>
              <Button type="submit">Отправить</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div >
  )
}

export default Conversation
