import React, { useEffect, useState } from 'react';
import AppRouter from '../components/router';
import { authService, authOnchange } from '../myBase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  useEffect(() => {
    const sns = () => {
      setIsLoggedIn(true);
    }
    const fail = () => {
      setIsLoggedIn(false)
    }
    const init = () => {
      setInit(true);
    }
    authOnchange(sns, fail, init);
  }, [])
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'Initializing...' }
      
      <footer>&copy: Dwitter { new Date().getFullYear() }</footer>
    </>

  )
}

export default App;
