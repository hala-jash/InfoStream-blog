import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './style.scss';
import RootLayout from './layout/RootLayout';
import Home from './pages/Home';
import Write from './pages/Write';
import Login from './pages/Login';
import Register from './pages/Register';
import Single from './pages/Single';
import Authors from './pages/Authors';
import Articles from './pages/Articles';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/write',
        element: <Write />,
      },
      {
        path: '/authors',
        element: <Authors />,
      },
      {
        path: '/single',
        element: <Single />,
      },
      {
        path: '/articles',
        element: <Articles />,
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

function App() {
  return (
    <div className='app'>
      <div className='container'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
