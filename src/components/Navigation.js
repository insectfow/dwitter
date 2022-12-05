import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ userObj }) => <nav>
  <ul className='nav-container'>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/profile">{userObj.displayName ? userObj.displayName + '의' : null} Profile</Link></li>
  </ul>
</nav>


export default Navigation;