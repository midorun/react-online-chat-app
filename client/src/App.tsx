import React from 'react'

// Components
import DashBoard from './DashBoard';
import Login from "./Login";

// hooks
import useLocalStorage from './hooks/useLocalStorage';
import { ContactsProvider } from './contexts/ContactsProvider';
import ConversationsProvider from './contexts/ConversationsProvider';
import { SocketProvider } from './contexts/SocketProvider';


const App: React.FC = () => {
  const [id, setid] = useLocalStorage('user-id')

  const dashBoardComponent = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <DashBoard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )


  return (
    <>
      {id ? dashBoardComponent : <Login onSubmit={setid} />}
    </>
  );
}

export default App;
