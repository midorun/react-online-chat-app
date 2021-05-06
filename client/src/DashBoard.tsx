import React from 'react'
import { useConversations } from './contexts/ConversationsProvider'
import Conversation from './Conversation'
import SideBar from './SideBar'

type DashBoardProps = {
  id: string
}

const DashBoard: React.FC<DashBoardProps> = ({ id }) => {
  const { selectedConversation } = useConversations()

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <SideBar id={id} />
      {selectedConversation ?
        <Conversation
          currentUserId={id}
          currentConversation={selectedConversation}
        /> : null}
    </div>
  )
}

export default DashBoard
