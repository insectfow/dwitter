import React, { useState, useRef } from 'react';
import { dbService, storageService } from '../myBase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from "firebase/firestore";
import imageCompression from 'browser-image-compression';  
import ReactIcon from '../assets/icons/upload-solid.svg';

import { v4 } from "uuid";

const DweetFactory = ({ userObj }) => {
  const [dweet, setDweet] = useState("");
  const [error, setError] = useState(null);
  const [attachment, setAttachment] = useState("");
  const fileUploadRef = useRef();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (dweet === '' ) {
      return window.alert('글과 이미지는 필수로 입력해주세요');
    }

    try {
      console.log(attachment);

      if (attachment !== '') {
        const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
        const response = await uploadString(attachmentRef, attachment, "data_url");
        const attachmentUrl = response ? await getDownloadURL(response.ref) : null;
        const dweetObj = {
          text: dweet,
          createdAt: Date.now(),
          creator: userObj.uid,
          attachmentUrl
        }

        await addDoc(collection(dbService, 'dweets'), dweetObj);
      } else {
        const dweetObj = {
          text: dweet,
          createdAt: Date.now(),
          creator: userObj.uid
        }

        await addDoc(collection(dbService, 'dweets'), dweetObj);
      }

      
      setError(null);
    } catch (error) {
      setError(error.message);
    }
    setDweet("");
    clearAttachmentClick();
  }

  const onChange = (event) => {
    const {
      target : { value }
    } = event;
    setDweet(value);
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

      console.log(compressedFile);
      
      // resize된 이미지의 url을 받아 fileUrl에 저장
      const promise = imageCompression.getDataUrlFromFile(compressedFile);
      promise.then(result => {
        setAttachment(result);
      })
    } catch (error) {
      setError(error.message);
    }
    event.target.value = "";
  }
  const clearAttachmentClick = () => setAttachment("");

  const uploadClick = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();

    console.log(fileUploadRef);
  }
  return (
    <>
      <form className='dweet-form' onSubmit={onSubmit}>
        <input className='dweet-input' value={dweet} onChange={onChange} type="text" placeholder='무슨 생각해?' maxLength={120} />
        <input className='dweet-file-input' ref={fileUploadRef} type="file" accept="image/*" onChange={onFileChange} />
        <button className='img-upload-button' onClick={uploadClick}>
          File Upload<img src={ReactIcon} alt="upload icon" /> 
        </button>
        {attachment && (
          <div className='dweet-uploaded-box'>
            <img src={attachment} alt="photos" />
            <button onClick={clearAttachmentClick}>Cancle upload</button>
          </div>
        ) }
        <input type="submit" value="Dweet" />
        
        { error ? <span>{ error }</span> : null }
      </form>
      
    </>
  )
};


export default DweetFactory;