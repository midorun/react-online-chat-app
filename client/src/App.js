import React from 'react'

// Components
import DashBoard from './DashBoard';
import Login from "./Login";

// hooks
import useLocalStorage from './hooks/useLocalStorage';
import { ContactsProvider } from './contexts/ContactsProvider';


function App() {
  const [id, setid] = useLocalStorage('user-id')

  const dashBoardComponent = (
    <ContactsProvider>
      <DashBoard id={id} />
    </ContactsProvider>
  )


  return (
    <>
      {id ? dashBoardComponent : <Login onSubmit={setid} />}
    </>
  );
}

export default App;
