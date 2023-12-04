import './App.css'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
  useLocation,
  useNavigate,
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
import Payment from './pages/Payment';
import ErrorBoundary from './pages/ErrorBoundary';
import Notification from './pages/notification';
import Verification from './pages/Verification';
import CorrectionNameAge from './pages/CorrectionNameAge';
import authService from './services/auth';
import { useEffect, useState } from 'react';
import { useUserContext } from './context/userContext';
import AllDocs from './pages/AllDocs';

const Root = () => {

  const { dispatch } = useUserContext()
  useEffect(() => {
    (async () => {
      try {
        const res = await authService.verifyUser()

        if (res.data.success) {
          dispatch({ type: "USER", payload: res.data.data })
        }
      } catch (err) {
        console.log("Error", err)
      }
    })()
  }, [])

  return (
    <div>
      <ScrollRestoration />
      <Outlet />
    </div>
  )
}

const PrivateRoot = () => {

  const navigate = useNavigate()
  let location = useLocation().pathname;
  const [splash, setSplash] = useState(true)
  const { dispatch } = useUserContext()

  useEffect(() => {
    (async () => {
      try {
        const res = await authService.verifyUser()
        console.log(res)

        if (res.data.success) {
          dispatch({ type: "USER", payload: res.data.data })
          setSplash(false)
          navigate('/dashboard')
        } else {
          setSplash(false)
          if (['/', '/login', '/signup', '/verification'].includes(location)) {
            navigate(location)
          } else {
            navigate('/login', { replace: true })
          }
        }
      } catch (err) {
        setSplash(false)
        navigate('/')
        console.log("Error", err)
      }
    })()
  }, [])

  if (splash) {
    return (
      <main className="h-[100vh] w-full grid place-items-center">
        <img src="/logo.svg" alt="HerCode Logo" className="h-[50px]" />
      </main>
    )
  }

  return (
    <div>
      <ScrollRestoration />
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: (
          <GoogleOAuthProvider
            clientId="563446519928-207jhmp7apj04ocfr7qqm7rbqpfbuvki.apps.googleusercontent.com"
          >
            <Login />
          </GoogleOAuthProvider>
        ),
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "verify-account",
        element: <VerifyAccount />,
      },
      {
        path: "verification",
        element: <Verification />,
      },
      {
        path: "all-docs",
        element: <AllDocs />,
      },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoot />,
    children: [
      {
        index: true,
        element: <Profile />
      },
      {
        path: 'correction-of-name-age',
        element: <CorrectionNameAge />
      },
      {
        path: 'change-of-name',
        element: <ChangeName />
      },
      {
        path: "update-profile",
        element: <UpdateProfile />
      },
      {
        path: "loss-of-docs",
        element: <LossDocuments />
      },
      {
        path: "public-notice",
        element: <PublicNotice />
      },
      {
        path: "affidavit",
        element: <Affidavit />
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "notification",
        element: <Notification />,
      },
      {
        path: "verification",
        element: <Verification />,
      },
    ]
  },
]);

export default function App() {
  return <RouterProvider router={router} />
}
