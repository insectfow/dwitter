import React from 'react';
import { authService } from '../myBase';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const navigation = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigation("/");
  };
  return (
    <>
      <h1>hi</h1>
      <button onClick={onLogOutClick}>log out</button>
    </>
  )
}

export default Profile;
