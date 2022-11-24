import React, { useState } from 'react';
import AppRouter from '../components/router';
import { authService } from '../myBase';

function App() {
  console.log(authService.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy: Dwitter { new Date().getFullYear() }</footer>
    </>

  )
}

export default App;
