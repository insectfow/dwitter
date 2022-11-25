import React, { useState } from 'react';
import { dbService } from '../myBase';
import { addDoc, collection } from "firebase/firestore";
const Home = () => {
  const [dweet, setDweet] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, 'dweets'), {
        dweet,
        createdAt: Date.now()
      });

      console.log(docRef);
      
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
    </div>
  )
  
}
  
export default Home;