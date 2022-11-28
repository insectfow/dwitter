import React, { useEffect, useState } from 'react';
import { dbService } from '../myBase';
import Dweet from '../components/Dweet'
import { addDoc, collection, getDocs, query, onSnapshot, orderBy } from "firebase/firestore";
const Home = ({userObj}) => {
  const [dweet, setDweet] = useState("");
  const [dweets, setDweets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dweetQuery = query(collection(dbService, 'dweets'), orderBy('createdAt', "desc"));
    onSnapshot(dweetQuery, (snapShot) => {
      const dweetArr = snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setDweets(dweetArr);
    });
  }, []);


  const onSubmit = async (event) => {
    event.preventDefault();

    if (dweet == '') {
      return window.alert('입력하세요')
    }

    try {
      const docRef = await addDoc(collection(dbService, 'dweets'), {
        text: dweet,
        createdAt: Date.now(),
        creator: userObj.uid
      });
      setError(null);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
    setDweet("")
  }
  const onChange = (event) => {
    const {
      target : { value }
    } = event;

    

    setDweet(value);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={dweet} onChange={onChange} type="text" placeholder='무슨 생각해?' maxLength={120} />
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