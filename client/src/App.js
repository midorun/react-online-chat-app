import React, { useState } from 'react'

import Login from "./Login";


function App() {
  const [id, setid] = useState()

  return (
    <>
      <Login onSubmit={setid} />
    </>
  );
}

export default App;
