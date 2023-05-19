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
import ChangeName from './pages/ChangeName';
import LossDocuments from './pages/LossDocuments';
import PublicNotice from './pages/PublicNotice';
import Affidavit from './pages/Affidavit';
import VerifyAccount from './pages/VerifyAccount';



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
    path: "/verify-account",
    element: <VerifyAccount />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/update-profile",
    element: <UpdateProfile />
  },
  {
    path: "/change-of-name",
    element: <ChangeName />
  },
  {
    path: "/loss-of-docs",
    element: <LossDocuments />
  },
  {
    path: "/public-notice",
    element: <PublicNotice />
  },
  {
    path: "/affidavit",
    element: <Affidavit />
  },
]);

export default function App() {
  return <RouterProvider router={router} />
}
