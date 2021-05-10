import React, { useState, useCallback } from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap';
import { ConversationType, useConversations } from './contexts/ConversationsProvider';

type Props = {
  currentUserId: string,
  currentConversation: ConversationType
}

const Conversation: React.FC<Props> = ({ currentUserId, currentConversation }) => {
  const [messageText, setMessageText] = useState('')
  const { sendMessage } = useConversations()
  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    sendMessage(
      {
        senderId: currentUserId,
        text: messageText
      },
      currentConversation.recipients.map(recipient => {
        return {
          id: recipient.id,
          name: recipient.name
        }
      })
    )

    setMessageText('')
  }

  return (
    <div className="d-flex flex-column flex-grow-1 px-3" >
      <div className="flex-grow-1 overflow-auto" style={{ width: '500px' }}>
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {currentConversation.messages.map((message, index) => {
            const lastMessage = currentConversation.messages.length - 1 === index
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${message.fromCurrentUser ? 'align-self-end align-items-end' : 'align-items-start'}`}
              >
                <div
                  className={`rounded px-2 py-1 ${message.fromCurrentUser ? 'bg-primary text-white' : 'border'}`}>
                  {message.text}
                </div>
                <div className={`text-muted small ${message.fromCurrentUser ? 'text-right' : ''}`}>
                  {message.fromCurrentUser ? 'You' : message.senderName}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <InputGroup style={{ width: '470px', height: '65px' }}>
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
