import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Dashboard from './pages/Dashboard';



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
    path: "/dashboard",
    element: <Dashboard />
  },
]);

export default function App() {
  return <RouterProvider router={router} />
}
