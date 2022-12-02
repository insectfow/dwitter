import React from 'react';
import "../assets/scss/auth.scss";
import AuthForm from '../components/AuthForm';
import SocialForm from '../components/SocialForm';
const Auth = () => {
  
  return (
    <div className='auth-page'>
      <div className='container'>
        <AuthForm />
        <SocialForm />
      </div>
    </div>
  )
}


export default Auth;