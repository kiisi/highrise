import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: (
      <GoogleOAuthProvider
        clientId="563446519928-207jhmp7apj04ocfr7qqm7rbqpfbuvki.apps.googleusercontent.com"
      >
        <Login />
      </GoogleOAuthProvider>
    )
  },
  {
    path: "/signup",
    element: <GoogleOAuthProvider
    clientId="563446519928-207jhmp7apj04ocfr7qqm7rbqpfbuvki.apps.googleusercontent.com"
  >
    <Signup />
  </GoogleOAuthProvider>
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/update-profile",
    element: <UpdateProfile />
  },
]);

export default function App() {
  return <RouterProvider router={router} />
}
