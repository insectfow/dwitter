import React, { useState } from 'react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onChanges = (event) => {
    console.log(event.target);
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }
  const onSubmit = (event) => {
    event.preventDefault();
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name='email' type='text' placeholder="Email" required alue={email} onChange={onChanges}></input>
        <input name='password' type='password' placeholder="Password" required value={password} onChange={onChanges} ></input>
        <input type="submit" value="log in"></input>
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  )
}


export default Auth;