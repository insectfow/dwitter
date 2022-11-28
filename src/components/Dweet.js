import React, { useState } from 'react';
import { dbService} from '../myBase'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

const Dweet = ({ dweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newDweet, setNewDweet] = useState(dweetObj.text);
  const DweetRef = doc(dbService, "dweets", `${dweetObj.id}`)
  const onDeleteClick = async () => {
    const ok = window.confirm("delete this dweets?");
    if (ok) {
      await deleteDoc(DweetRef)
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

    if (newDweet == '') {
      return window.alert('입력하세요')
    }

    await updateDoc(DweetRef, {
      text: newDweet
    })
    await toggleEditting();
  }

  return (
    <div >
      {editing ? <form onSubmit={onSubmit}>
        <input type="text" value={newDweet} onChange={onChange} required />
        <input type="submit" value="update dweet" />
        <button onClick={toggleEditting}>cencle</button>
      </form>
      
      : <><h4>{dweetObj.text} {isOwner}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Dweet</button>
          <button onClick={toggleEditting}>Edit Dweet</button>
        </>
      )}</>}
      
    </div>
  )
}

export default Dweet;