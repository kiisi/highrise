import './App.css'
import {
  createBrowserRouter,
  redirect,
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
import Auth from './hoc/Auth';
import { base_endpoint } from './utils/endpoints';
import Payment from './pages/Payment';
import ErrorBoundary from './pages/ErrorBoundary';
import Notification from './pages/Notification';
import Verification from './pages/Verification';

const loaderFunc = async () => {
  const settings = {
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    }
  };
  try {
    const res = await fetch(`${base_endpoint}/auth/verify-user`, settings)
    const data = await res.json()
    if (data.success) {
      return redirect('/profile')
    }
  } catch (err) {
    console.log('')
  }
  return null
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorBoundary />,
    loader: async () =>{
      const settings = {
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        }
      };
      try {
        const res = await fetch(`${base_endpoint}/auth/verify-user`, settings)
        const data = await res.json()
        if (data.success) {
          return true
        }
      } catch (err) {
        return false
      }
      return false
    }
  },
  {
    path: "/login",
    element: (
      <GoogleOAuthProvider
        clientId="563446519928-207jhmp7apj04ocfr7qqm7rbqpfbuvki.apps.googleusercontent.com"
      >
        <Login />
      </GoogleOAuthProvider>
    ),
    loader: loaderFunc
  },
  {
    path: "/signup",
    element: (
      <GoogleOAuthProvider
        clientId="563446519928-207jhmp7apj04ocfr7qqm7rbqpfbuvki.apps.googleusercontent.com"
      >
        <Signup />
      </GoogleOAuthProvider>
    ),
    loader: loaderFunc
  },
  {
    path: "/verify-account",
    element: <VerifyAccount />,
    loader: loaderFunc,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/profile",
    element: <Auth><Profile /></Auth>
  },
  {
    path: "/update-profile",
    element: <Auth><UpdateProfile /></Auth>
  },
  {
    path: "/change-of-name",
    element: <Auth><ChangeName /></Auth>
  },
  {
    path: "/loss-of-docs",
    element: <Auth><LossDocuments /></Auth>
  },
  {
    path: "/public-notice",
    element: <Auth><PublicNotice /></Auth>
  },
  {
    path: "/affidavit",
    element: <Auth><Affidavit /></Auth>
  },
  {
    path: "/payment",
    element: <Auth><Payment/></Auth>,
  },
  {
    path: "/notification",
    element: <Auth><Notification/></Auth>,
  },
  {
    path: "/verification",
    element: <Verification/>,
  },
]);

export default function App() {
  return <RouterProvider router={router} />
}
