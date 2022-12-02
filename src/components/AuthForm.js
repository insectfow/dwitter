import React, { useState } from 'react';
import { createUser, signUser } from '../myBase';


const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");
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
    if (newAccount) {
      // create
      createUser(
        email,
        password, errorFunc
      )
    } else {
      // log in
      signUser(
        email,
        password, errorFunc
      )
    }
  }
  const onToggle = () => setNewAccount((prev) => !prev);
  return (
    <>
      <form onSubmit={onSubmit}>
          <input name='email' type='text' placeholder="이메일" required alue={email} onChange={onChanges}></input>
          <input name='password' type='password' placeholder="비밀번호" required value={password} onChange={onChanges} ></input>
          <input type="submit" value={newAccount ? 'Create Acoount' : 'Log In'}></input>
          { error ? <span className='error-msg'>{ error }</span> : null }
      </form>
      <span className='toggle-btn' onClick={onToggle}>{ newAccount ? 'Sign In' : 'Create Account'}</span>
    </>
  )
};


export default AuthForm;