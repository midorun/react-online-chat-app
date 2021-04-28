import React from 'react'

// Components
import DashBoard from './DashBoard';
import Login from "./Login";

// hooks
import useLocalStorage from './hooks/useLocalStorage';


function App() {
  const [id, setid] = useLocalStorage('user-id')

  return (
    <>
      {id ? <DashBoard /> : <Login onSubmit={setid} />}
    </>
  );
}

export default App;
