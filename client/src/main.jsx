import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import About from './pages/About.jsx';
import Profile from './pages/Profile';
import SingleThought from './pages/SingleThought';
import ErrorPage from './pages/ErrorPage';
import Business from './pages/Business';
import UploadBusiness from './pages/UploadBusiness';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/businesses/:id',
        element: <Business />
      }, {
        path: '/businesses/upload',
        element: <UploadBusiness />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/thoughts/:thoughtId',
        element: <SingleThought />
      }, {
        path: '/about',
        element: <About />
      }, {
        path: '/profile',
        element: <Profile />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
