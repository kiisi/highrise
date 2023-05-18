import { Link } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"
import Navbar from "../layout/Navbar"
import google_icon from '../assets/google.svg'
import { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google';


const Login = () => {

  
  // eslint-disable-next-line no-unused-vars
  const [profile, setProfile] = useState(null);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const res = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
      );

      const userInfo = await res.json()
      console.log(userInfo)
      setProfile(userInfo)
    },
    onError: errorResponse => console.log(errorResponse),
  });

  // const logOut = () => {
  //   googleLogout();
  //   setProfile(null);
  // };


  return (
    <div className=" min-h-[100vh]">
      <Navbar />
      <main className="flex pt-16 pb-16 gap-x-16 px-4 ss:px-8 mx-auto max-w-xl">

        <div className="max-w-[30rem] pt-16 hidden ss:block flex-1">
          <h1 className="font-bold text-[16px] mb-2">CLASSIFIED ADVERTS</h1>
          <p>SIGN UP WITH HIGHRISE NEWSPAPER , VIEW YOUR DASHBOARD AND SELECT, THEN CLICK ON  YOUR PREFARED ADVERT REQUEST TO FILL THE ISSUED FORMS</p>
        </div>

        <div className="flex-1">
          <header className="mb-16">
            <h1 className="text-[36px] font-bold text-primary">Welcome Once Back</h1>
          </header>
          <div className="max-w-[30rem]">
            <fieldset className="mb-10">
              <Input type="email" label="Email" />
            </fieldset>
            <fieldset className="mb-10">
              <Input type="password" label="Password" />
            </fieldset>
            <Button>Login</Button>

            <p className="mt-5">Don&rsquo;t have an account? <Link className="text-primary" to='/signup'>Signup</Link></p>

            <button onClick={googleLogin} className="flex mt-5 gap-x-4 items-center box-shadow-1 p-3 rounded-[4px]">
              <img src={google_icon} alt="Google Sign in" className="!h-[25px]" />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login

