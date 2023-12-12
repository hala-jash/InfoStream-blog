import React from 'react';
import { Link } from 'react-router-dom';
export default function Login() {
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input
          required
          type='text'
          placeholder='username'
          class='input-container'
        />
        <input
          required
          type='password'
          placeholder='password'
          class='input-container'
        />
        <button>Login</button>
        <p>This is an error</p>
        <span>
          No account ? <Link to='/register'>Sign up</Link>
        </span>
      </form>
    </div>
  );
}
