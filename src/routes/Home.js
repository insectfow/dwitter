import React, { useEffect, useState } from 'react';
import { dbService, storageService } from '../myBase';
import { v4 } from "uuid"
import Dweet from '../components/Dweet'
import { addDoc, collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
const Home = ({userObj}) => {
  const [dweet, setDweet] = useState("");
  const [dweets, setDweets] = useState([]);
  const [error, setError] = useState(null);
  const [attachment, setAttachment] = useState("");
  useEffect(() => {
    const dweetQuery = query(collection(dbService, 'dweets'), orderBy('createdAt', "desc"));
    onSnapshot(dweetQuery, (snapShot) => {
      const dweetArr = snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setDweets(dweetArr);
    });
  }, []);


  const onSubmit = async (event) => {
    event.preventDefault();

    
    if (dweet === '' || attachment === '') {
      return window.alert('글과 이미지는 필수로 입력해주세요');
    }

    try {
      const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(attachmentRef, attachment, "data_url");
      const attachmentUrl = await getDownloadURL(response.ref);
      const dweetObj = {
        text: dweet,
        createdAt: Date.now(),
        creator: userObj.uid,
        attachmentUrl
      }

      await addDoc(collection(dbService, 'dweets'), dweetObj);
      setError(null);
    } catch (error) {
      setError(error.message);
      console.log(error);
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
  const onFileChange = (event) => {
    const { target: { files } } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (fininshedEvent) => {
      const { currentTarget: { result } } = fininshedEvent;
      setAttachment(result)
    }
    reader.readAsDataURL(theFile);
  }
  const clearAttachmentClick = () => setAttachment("");

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={dweet} onChange={onChange} type="text" placeholder='무슨 생각해?' maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="photos" />
            <button onClick={clearAttachmentClick}>Cancle upload</button>
          </div>
        ) }
        <input type="submit" value="Dweet" />
        { error ? <span>{ error }</span> : null }
      </form>
      <div>
        
        {dweets.map((dweet) => (
          <Dweet key={dweet.id} dweetObj={dweet} isOwner={ dweet.creator === userObj.uid} /> 
        ))}
      </div>
    </div>
  )
  
}
  
export default Home;