import React, { useState } from 'react';

const Pachinko = () => {
  const [pachinkos, setPachinkos] = useState([false, false, false, false, false]);
  
  const onSubmit = (event) => {
    event.preventDefault();
    
  }
  const onChange = (event, idx) => {
    const {
      target: { checked }
    } = event;
    setPachinkos(checked)
    console.log(pachinkos);
    // setPachinkos(pachinkos[idx] = checked);
    // setPachinkos(pachinkos[idx] = checked)
    // if (checked) {
    //   setPachinkos(pachinkos[idx] = checked)
    // } else {
    //   // setPachinkos(pachinkos.filter(user => user !== idx ));
    // }
  }
  return (
    <div>
      <form onSubmit={onSubmit} >
      {pachinkos.map((val, idx) => (
          <input type="checkbox" key={idx} value={val} onChange={e => { onChange(e, idx) }} />
      ) )}
      </form>
    </div>
  )
};

export default Pachinko;