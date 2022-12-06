import { updateProfile } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import AppRouter from '../components/router';
import { authOnchange, authService } from '../myBase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    const sns = (user) => {
      setIsLoggedIn(true);
      setUserObj({
        displayName: user.displayName,
        uid: user.uid,
        photoURL: user.photoURL,
        updateProfile: (args) => updateProfile(user, {displayName: user.displayName, photoURL: user.photoURL})
      });

      console.log(user);
    }
    const fail = () => {
      setIsLoggedIn(false);
      setUserObj(null);
    }
    const init = () => {
      setInit(true);
    }
    authOnchange(sns, fail, init);
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL,
      updateProfile: (args) => updateProfile(user, {displayName: user.displayName, photoURL: user.photoURL})
    });
  }
  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj} /> : 'Initializing...' }
      
      {/* <footer>&copy: Dwitter { new Date().getFullYear() }</footer> */}
    </>

  )
}

export default App;
