import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ userObj }) => <nav>
  <ul className='nav-container'>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/profile">{userObj.displayName}의 Profile</Link></li>
    {/* <li><Link to="/pachinko">Pachinko</Link></li> */}
  </ul>
</nav>


export default Navigation;