import React from 'react'
import { useConversations } from './contexts/ConversationsProvider'
import Conversation from './Conversation'
import SideBar from './SideBar'

const DashBoard = ({ id }) => {
  const { selectedConversation } = useConversations()

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <SideBar id={id} />
      {selectedConversation ? <Conversation /> : null}
    </div>
  )
}

export default DashBoard
