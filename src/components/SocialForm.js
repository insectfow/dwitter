import React from 'react';
import {  GoogleProvider, GithubProvider, signPopup } from '../myBase';

import GoogleIcon from '../assets/icons/google.svg';
import GitHubIcon from '../assets/icons/github.svg';

const SocialForm = () => {
  
  const onSocailClick = async (event) => {
    let provider;
    const {
      target: { name },
    } = event;

    if (name === 'google') {
      provider = GoogleProvider;
    } else if (name === 'github') {
      provider = GithubProvider;
    }
    await signPopup(provider);
  }
  return (
    <>
      <div className='social-buttons'>
        <button onClick={onSocailClick} name="google" ><img src={GoogleIcon} alt='google icon' />Continue with Google</button>
        <button onClick={onSocailClick} name="github"><img src={GitHubIcon} alt='github icon' />Continue with Github</button>
      </div>
    </>
  );
}

export default SocialForm;