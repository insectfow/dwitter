import React from 'react';
import "../assets/scss/auth.scss";
import AuthForm from '../components/AuthForm';
import SocialForm from '../components/SocialForm';
import ReactIcon from '../assets/icons/rebel.svg';
const Auth = () => {
  
  return (
    <div className='auth-page'>
      <div className='container'>
        <h1 className='page-tatle'><img src={ ReactIcon } alt="react icon" /></h1>
        <AuthForm />
        <SocialForm />
      </div>
    </div>
  )
}


export default Auth;