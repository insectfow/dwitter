import React, { useEffect, useState } from 'react';
import { authService, dbService } from '../myBase';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

const Profile = ({ refreshUser, userObj }) => {
  const navigation = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    navigation("/");
    refreshUser();
  };

  const getMyDweets = async () => {
    const fbQuery = query(collection(dbService, "dweets"), where("creator", "==", userObj.uid));
    const querySnapshot = await getDocs(fbQuery);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    })
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, { displayName: newDisplayName });
      refreshUser();
    }
  }

  const onChange = (event) => {
    const { target: { value } } = event;

    setNewDisplayName(value);
  }

  useEffect( () => {
    getMyDweets();
  });

  return (
    <div className='page'>
      <div className='container'>
        <form onSubmit={onSubmit}>
          <label>
            닉네임
          </label>
          <input className='profile-input' type="text" placeholder='Display name' value={newDisplayName} onChange={onChange} />
          <input type="submit" value="Update Profile" />
        </form>
      <button className='red' onClick={onLogOutClick}>log out</button>
      </div>
    </div>
  )
}

export default Profile;
