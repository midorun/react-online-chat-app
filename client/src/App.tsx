import React from 'react'

// Components
import DashBoard from './DashBoard';
import Login from "./Login";

// hooks
import useLocalStorage from './hooks/useLocalStorage';
import { ContactsProvider } from './contexts/ContactsProvider';
import ConversationsProvider from './contexts/ConversationsProvider';


const App: React.FC = () => {
  const [id, setid] = useLocalStorage('user-id')

  const dashBoardComponent = (
    <ContactsProvider>
      <ConversationsProvider>
        <DashBoard id={id} />
      </ConversationsProvider>
    </ContactsProvider>
  )


  return (
    <>
      {id ? dashBoardComponent : <Login onSubmit={setid} />}
    </>
  );
}

export default App;
