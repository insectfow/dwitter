import React from 'react';
import {  GoogleProvider, GithubProvider, signPopup } from '../myBase';


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
      <div>
        <button onClick={onSocailClick} name="google" >Continue with Google</button>
        <button onClick={onSocailClick} name="github">Continue with Github</button>
      </div>
    </>
  );
}

export default SocialForm;