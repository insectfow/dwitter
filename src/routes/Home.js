import React, { useEffect, useState } from 'react';
import { dbService } from '../myBase';
import { addDoc, collection, getDocs, query } from "firebase/firestore";
const Home = () => {
  const [dweet, setDweet] = useState("");
  const [dweets, setDweets] = useState([]);

  const getDweets = async () => {
    const dweetQuery = query(collection(dbService, 'dweets'));
    const querySnapShot = await getDocs(dweetQuery);
    querySnapShot.forEach((doc) => {
      const dweetObj = {
        ...doc.data(),
        id: doc.id
      }
      setDweets(prev => [dweetObj, ...prev]);
    })
  }

  useEffect(() => {
    getDweets();
  }, []);


  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, 'dweets'), {
        dweet,
        createdAt: Date.now()
      });
    } catch (error) {
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
        <input  type="submit" value="Dweet" />
      </form>
      <div>
        {dweets.map((dweet) => <div key={dweet.id}>
            <h4>{ dweet.dweet }</h4>
          </div>
        )}
      </div>
    </div>
  )
  
}
  
export default Home;