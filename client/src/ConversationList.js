import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from './contexts/ConversationsProvider'

const Conversations = () => {
  const {
    conversations,
    selectConversationIndex,
    deleteConversation
  } = useConversations()

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => {
        const { recipients, selected } = conversation
        return (
          <ListGroup.Item
            key={index}
            action
            onClick={() => selectConversationIndex(index)}
            active={selected}
            className="d-flex justify-content-between align-items-center"
          >
            {recipients.map(({ name }) => name).join(', ')}
            <i
              className="fas fa-times"
              onClick={() => deleteConversation(index)}
            />
          </ListGroup.Item>
        )
      })}

    </ListGroup>
  )
}
export default Conversations
