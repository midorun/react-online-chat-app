import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from './contexts/ConversationsProvider'

const Conversations = () => {
  const { conversations, selectConversationIndex } = useConversations()
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
          >
            {recipients.map(({ name }) => name).join(', ')}
          </ListGroup.Item>
        )
      })}

    </ListGroup>
  )
}
export default Conversations
