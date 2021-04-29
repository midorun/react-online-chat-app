import React, { useState } from 'react'
import { Button, Modal, Nav, Tab } from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewConversationModal from './NewConversationModal'
import NewContactsModal from './NewContactsModal'

const CONVERSATIONS_KEY = 'Диалоги'
const CONTACTS_KEY = 'Контакты'

const SideBar = ({ id }) => {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
  const [modalShow, setModalShow] = useState(false)


  const closeModal = (params) => {
    setModalShow(false)
  }

  const conversationOpen = activeKey === CONVERSATIONS_KEY

  return (
    <div className="d-flex flex-column" style={{ width: '250px' }} >
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey} >
        <Nav variant='tabs' className='justify-content-center' >
          <Nav.Item >
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Диалоги</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Контакты</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small">
          Ваш айди: <span className="text-muted">{id}</span>
        </div>
        <Button onClick={() => setModalShow(true)}>
          Новый {conversationOpen ? 'Диалог' : 'Контакт'}
        </Button>
      </Tab.Container>

      <Modal show={modalShow} onHide={closeModal}>
        {conversationOpen ?
          <NewConversationModal closeModal={closeModal} /> :
          <NewContactsModal closeModal={closeModal} />
        }
      </Modal>
    </div>
  )
}

export default SideBar