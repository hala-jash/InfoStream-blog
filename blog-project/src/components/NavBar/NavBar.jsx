import React from 'react';
import Logo from '../../assets/Infologo.png';
import { Link } from 'react-router-dom';
import './navbar.css';
export default function NavBar() {
  return (
    <div className='navBar'>
      <div className='logo'>
        <img src={Logo} alt='InfoStream Logo' />
      </div>
      <ul className='link-item'>
        <li>
          <Link to='/articles'>Articles</Link>
        </li>
        <li>
          <Link to='/Authors'>Authors</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li className='write'>
          <Link to='/write'>Write</Link>
        </li>
      </ul>
    </div>
  );
}
