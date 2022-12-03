import React, { useEffect, useState } from 'react';
import { dbService } from '../myBase';
import Dweet from '../components/Dweet'
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

import DweetFactory from '../components/DweetFactory';

const Home = ({userObj}) => {
  const [dweets, setDweets] = useState([]);
  
  useEffect(() => {
    const dweetQuery = query(collection(dbService, 'dweets'), orderBy('createdAt', "desc"));
    onSnapshot(dweetQuery, (snapShot) => {
      const dweetArr = snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setDweets(dweetArr);
    });
  }, []);
  return (
    <div className='page'>
      <div className='container'>
        <DweetFactory userObj={userObj} />
        <div>
          {dweets.map((dweet) => (
            <Dweet key={dweet.id} dweetObj={dweet} isOwner={ dweet.creator === userObj.uid} /> 
          ))}
        </div>
      </div>
    </div>
  )
  
}
  
export default Home;