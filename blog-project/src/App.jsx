import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Write from './pages/Write';
import Authors from './pages/Authors';
import Articles from './pages/Articles';
import SingleArticle from './pages/SingleArticle';

function App() {
  return (
    <Router>
      <div className='app'>
        <div className='app-container'>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/authors' element={<Authors />} />
            <Route path='/login' element={<Login />} />
            <Route path='/write' element={<Write />} />
            <Route path='/articles' element={<Articles />} />
            <Route path='/article/:articleId' element={<SingleArticle />} />
          </Routes>
          {/* <Footer /> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
