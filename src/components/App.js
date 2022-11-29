import React, { useEffect, useState } from 'react';
import AppRouter from '../components/router';
import { authOnchange } from '../myBase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    const sns = (user) => {
      setIsLoggedIn(true);
      setUserObj(user);
    }
    const fail = () => {
      setIsLoggedIn(false);
    }
    const init = () => {
      setInit(true);
    }
    authOnchange(sns, fail, init);
  }, [])
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : 'Initializing...' }
      
      {/* <footer>&copy: Dwitter { new Date().getFullYear() }</footer> */}
    </>

  )
}

export default App;
