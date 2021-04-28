import React from 'react'
import { Nav, Tab } from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'

const SideBar = () => {
  return (
    <div className="d-flex flex-column" style={{ width: '250px' }} >
      <Tab.Container defaultActiveKey="conversations" >
        <Nav variant='tabs' className='justify-content-center' >
          <Nav.Item >
            <Nav.Link eventKey="conversations">Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="contacts">Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey="conversations">
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey="contacts">
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        Your id:
      </Tab.Container>
    </div>
  )
}

export default SideBar
