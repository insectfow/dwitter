import React, { useState } from 'react';
import { dbService, storageService } from '../myBase'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from "firebase/storage";
import ReactIcon from '../assets/icons/ellipsis-solid.svg';
import "../assets/scss/dweet.scss";

const Dweet = ({ dweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newDweet, setNewDweet] = useState(dweetObj.text);
  const [isFix, setIsFix] = useState(false);
  const DweetRef = doc(dbService, "dweets", `${dweetObj.id}`);
  const storageRef = ref(storageService, dweetObj.attachmentUrl);
  const onDeleteClick = async () => {
    const ok = window.confirm("delete this dweets?");
    if (ok) {
      await deleteDoc(DweetRef);
      await deleteObject(storageRef);
    }
  }
  const toggleEditting = () => {
    setEditing((prev) => !prev);
  }
  const onChange = (event) => {
    const {
      target: { value }
    } = event;

    setNewDweet(value);
    
  };
  const onSubmit = async (event) => {
    event.preventDefault();

    if (newDweet === '') {
      return window.alert('입력하세요')
    }

    await updateDoc(DweetRef, {
      text: newDweet
    })
    await toggleEditting();
  }

  const toggleFix = () => {
    setIsFix(prev => !prev);
  }

  return (
    <div className='dweet-wrap'>
      {editing ? <form onSubmit={onSubmit}>
        <input type="text" value={newDweet} onChange={onChange} required />
        <input type="submit" value="update dweet" />
        <button onClick={toggleEditting}>cencle</button>
      </form>
        : <div className='dweet-box'>
            <h4>
            {dweetObj.text} {isOwner}
            <figure className='fix-icon' onClick={toggleFix}>
              <img src={ReactIcon} alt="fix icon" />
            </figure>
          </h4>
          
            <figure>
              <img src={dweetObj.attachmentUrl} alt="photos" />
            </figure>
            {isOwner && isFix && (
            <div className='dweet-button-box'>
              <button className='red' onClick={onDeleteClick}>Delete Dweet</button>
              <button className='on' onClick={toggleEditting}>Edit Dweet</button>
            </div>
        )}</div>}
      
    </div>
  )
}

export default Dweet;