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
import LandingPage from './pages/LandingPage';
import Business from './pages/Business';
import UploadBusiness from './pages/UploadBusiness';
import Search from './pages/Search';
import BadgePage from './pages/BadgePage.jsx';
import UserProfile from './pages/UserProfile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/business/:businessId',
        element: <Business />
      }, {
        path: '/business/upload',
        element: <UploadBusiness />
      }, {
        path: '/search',
        element: <Search />
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
      }, {
        path: '/profile/:id',
        element: <UserProfile />
      }, {
        path: '/home',
        element: <Home />
      }, {
        path: '/badges',
        element: <BadgePage />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
