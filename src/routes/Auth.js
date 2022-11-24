import React, { useState } from 'react';
import { createUser, signUser } from '../myBase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState('');
  const onChanges = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    const errorFunc = (error) => {
      setError(error);
    }
    let data;
    if (newAccount) {
      // create
      data = createUser(
        email,
        password, errorFunc
      )
    } else {
      // log in
      data = signUser(
        email,
        password, errorFunc
      )
    }
  }
  const onToggle = () => setNewAccount((prev) => !prev);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name='email' type='text' placeholder="Email" required alue={email} onChange={onChanges}></input>
        <input name='password' type='password' placeholder="Password" required value={password} onChange={onChanges} ></input>
        <input type="submit" value={newAccount ? 'Create Acoount' : 'Log In'}></input>
        {error}
      </form>
      <span onClick={onToggle}>{ newAccount ? 'sign in' : 'create account'}</span>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  )
}


export default Auth;