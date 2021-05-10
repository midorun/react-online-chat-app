
import { ListGroup } from 'react-bootstrap'
import { useConversations } from './contexts/ConversationsProvider'

const ConversationList = () => {
  const {
    conversations,
    selectConversationIndex,
    deleteConversation,
  } = useConversations()
  if (typeof conversations === undefined) {
    console.log('UNDEFINED')

  }
  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => {
        return (
          <ListGroup.Item
            key={index}
            action
            onClick={() => selectConversationIndex(index)}
            active={conversation.selected}
            className="d-flex justify-content-between align-items-center"
          >
            {conversation.recipients.map(({ name }) => name).join(', ')}
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
export default ConversationList
