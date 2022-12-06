import React, { useEffect, useState, useRef } from 'react';
import { authService, dbService, storageService } from '../myBase';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import imageCompression from 'browser-image-compression';  
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import ReactIcon from '../assets/icons/pencil-solid.svg';

const Profile = ({ refreshUser, userObj }) => {
  const navigation = useNavigate();
  const [error, setError] = useState(null);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [photoURL, setPhotoURL] = useState('');
  const fileUploadRef = useRef();
  const onLogOutClick = () => {
    authService.signOut();
    navigation("/");
    refreshUser();
  };

  const getMyDweets = async () => {
    const fbQuery = query(collection(dbService, "dweets"), where("creator", "==", userObj.uid));
    const querySnapshot = await getDocs(fbQuery);
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
    })
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let updateObj = {};

      if (userObj.displayName === newDisplayName && photoURL === "") {
        return;
      }

      if (userObj.displayName !== newDisplayName) {
        updateObj = { displayName: newDisplayName }
      }

      if (photoURL !== "") {
        const attachmentRef = ref(storageService, `${userObj.uid}/profile-image`);
        const response = await uploadString(attachmentRef, photoURL, "data_url");
        const attachmentUrl = await getDownloadURL(response.ref);

        updateObj = { ...updateObj, photoURL: attachmentUrl };
      }

      await updateProfile(authService.currentUser, updateObj);
      refreshUser();

    } catch(error) {
      setError(error.message);
    }
    
    


    

    

  }

  const onChange = (event) => {
    const { target: { value } } = event;

    setNewDisplayName(value);
  }

  const onFileChange = async (event) => {
    const { target: { files } } = event;
    const file = files[0];

    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 500,
    }

    try {
      const compressedFile = await imageCompression(file, options);
      // resize된 이미지의 url을 받아 fileUrl에 저장
      const promise = imageCompression.getDataUrlFromFile(compressedFile);
      promise.then( (result) => {
        
        setPhotoURL(result);
        

      })
    } catch (error) {
      setError(error.message);
    }
    event.target.value = "";
  }

  const fileUploadClick = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  }

  useEffect( () => {
    getMyDweets();
  });

  return (
    <div className='page'>
      <div className='container'>
        <form onSubmit={onSubmit}>
          <div className='profile-image-fix-box'>
            <input type="file" accept="image/*" ref={fileUploadRef} onChange={onFileChange} />
            <div className='image-box'>
              <button onClick={fileUploadClick}>
                <img src={ReactIcon}></img>
              </button>
              <figure>
                <img src={photoURL ? photoURL : userObj.photoURL} alt="profile image" />
              </figure>
            </div>
          </div>
          <label>
            닉네임
          </label>
          <input className='profile-input' type="text" placeholder='Display name' value={newDisplayName} onChange={onChange} />
          <input type="submit" value="Update Profile" />
          { error ? <span>{ error }</span> : null }
        </form>
      <button className='red' onClick={onLogOutClick}>log out</button>
      </div>
    </div>
  )
}

export default Profile;
