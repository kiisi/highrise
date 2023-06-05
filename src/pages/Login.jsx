import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Input from "../components/Input"
import Navbar from "../layout/Navbar"
import google_icon from '../assets/google.svg'
import { useGoogleLogin } from '@react-oauth/google';
import { useRef, useState } from 'react'
import { base_endpoint } from "../utils/endpoints"
import Spinner from "../components/Spinner"
import { Helmet } from "react-helmet";
import { toast } from 'react-toastify';
import validator from 'validator';

const Login = () => {

  const navigate = useNavigate()

  const emailRef = useRef()
  const passwordRef = useRef()
  const [loading, setLoading] = useState(false)

   const passwordAuth = () =>{
    submit({
      email:emailRef.current.value,
      password: passwordRef.current.value,
      auth_type: "password"
    })
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
      );

      const userInfo = await res.json()
      // Google Auth
      await submit({
        email:userInfo.email,
        auth_type: "google"
      })
    },
    onError: errorResponse => {
      console.log(errorResponse)
      toast.error("Google auth failed!")
    },
  });

  const submit = async (body) =>{

    if(!validator.isEmail(body.email)){
      return toast.error("Invalid Email")
    }

    if(body.auth_type === "password"){
      if(body.password.trim() === ''){
        return toast.error("Password is required!")
      }
    }

    let url = `${base_endpoint}/auth/login`

    const settings = {
      method: "post",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    setLoading(true)

    try{

      let response = await fetch(url, settings)
      let result = await response.json()
      setLoading(false)
      console.log(result)
      if(result.success){
        toast.success(result.success)
        navigate('/profile')
      }else{
        toast.error(result.error)
      }

    }catch(err){
      toast.error("An error occurred")
      setLoading(false)
      console.log(err)
    }

  }

  return (
    <div className="min-h-[100vh]">
      <Helmet>
        <title>Highrise Login</title>
      </Helmet>
      <Navbar />
      {loading ? <Spinner/> : null}
      <main className="flex pt-16 pb-16 gap-x-16 px-4 ss:px-8 mx-auto max-w-xl page-offset">

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
              <Input type="email" label="Email" ref={emailRef}/>
            </fieldset>
            <fieldset className="mb-10">
              <Input type="password" label="Password" ref={passwordRef}/>
            </fieldset>
            <Button onClick={passwordAuth}>Login</Button>

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

