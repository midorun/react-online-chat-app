import React from 'react'
import useLocalStorage from './hooks/useLocalStorage';

import Login from "./Login";


function App() {
  const [id, setid] = useLocalStorage('user-id')

  return (
    <>
      <Login onSubmit={setid} />
    </>
  );
}

export default App;
