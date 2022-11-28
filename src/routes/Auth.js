import React, { useState } from 'react';
import { authService, createUser, signUser, GoogleProvider, GithubProvider, signPopup } from '../myBase';
import "../assets/scss/auth.scss";
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
  const onSocailClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = GoogleProvider;
    } else if (name === 'github') {
      provider = GithubProvider;
    }
    await signPopup(provider);
  }
  return (
    <div className='auth-page'>
      <div className='container'>
        
        <form onSubmit={onSubmit}>
          <input name='email' type='text' placeholder="이메일" required alue={email} onChange={onChanges}></input>
          <input name='password' type='password' placeholder="비밀번호" required value={password} onChange={onChanges} ></input>
          <input type="submit" value={newAccount ? 'Create Acoount' : 'Log In'}></input>
          { error ? <span className='error-msg'>{ error }</span> : null }
        </form>
        <span className='toggle-btn' onClick={onToggle}>{ newAccount ? 'Sign In' : 'Create Account'}</span>
        <div>
          <button onClick={onSocailClick} name="google" >Continue with Google</button>
          <button onClick={onSocailClick} name="github">Continue with Github</button>
        </div>
      </div>
    </div>
  )
}


export default Auth;