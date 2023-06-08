import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import Navbar from '../layout/Navbar'
import google_icon from '../assets/google.svg'
import { useRef, useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { base_endpoint } from '../utils/endpoints'
import Spinner from '../components/Spinner'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify';
import { requestEmailOtp } from '../utils'
import { useUserContext } from '../context/userContext'

const Signup = () => {

  const navigate = useNavigate()
  const { dispatch } = useUserContext()

  const fullNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const [loading, setLoading] = useState(false)

  const passwordAuth = () => {
    submit({
      auth_type: "password",
      full_name: fullNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    })
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const res = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
      );

      const userInfo = await res.json()
      console.log(userInfo)
      // Google Auth
      await submit({
        auth_type: "google",
        full_name: userInfo.name,
        email: userInfo.email
      })
    },
    onError: errorResponse => {
      console.log(errorResponse)
      toast.error("Google auth failed!")
    },
  });

  const submit = async (body) => {
    console.log(body)

    let url = `${base_endpoint}/auth/signup`

    const settings = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    setLoading(true)

    try {

      let response = await fetch(url, settings)
      let result = await response.json()
      console.log(result)
      setLoading(false)

      if (result.success) {
        toast.success(result.success)
        requestEmailOtp({email: result.data.email})
        dispatch({type: "VERIFICATION_EMAIL", payload: {email: result.data.email}})
        localStorage.setItem("verification-email", result.data.email)
        navigate('/verify-account')
      } else {
        toast.error(result.error)
      }

    } catch (err) {
      setLoading(false)
      toast.error("A error occurred!")
    }
  }


  return (
    <>
      <div className="min-h-[100vh]">
        <Helmet>
          <title>Highrise Signup</title>
        </Helmet>
        <Navbar />
        {loading ? <Spinner /> : null}
        <main className="page-offset flex pt-16 pb-16 gap-x-16 px-4 ss:px-8 mx-auto max-w-xl">
          <div className="max-w-[30rem] pt-16 hidden ss:block flex-1">
            <h1 className="font-bold text-[16px] mb-2">CLASSIFIED ADVERTS</h1>
            <p>SIGN UP WITH HIGHRISE NEWSPAPER , VIEW YOUR DASHBOARD AND SELECT, THEN CLICK ON  YOUR PREFARED ADVERT REQUEST TO FILL THE ISSUED FORMS</p>
          </div>

          <div className="flex-1">
            <header className="mb-16">
              <h1 className="text-[36px] font-bold text-primary">Welcome To Highrise</h1>
              <p className="font-bold">Signup and register your account</p>
            </header>
            <div className="max-w-[30rem]">
              <fieldset className="mb-10">
                <Input type="text" label="Full Name" ref={fullNameRef} />
              </fieldset>
              <fieldset className="mb-10">
                <Input type="email" label="Email" ref={emailRef} />
              </fieldset>
              <fieldset className="mb-10">
                <Input type="password" label="Password" ref={passwordRef} />
              </fieldset>

              <Button onClick={passwordAuth}>Get Started</Button>

              <p className="mt-5">Already have an account? <Link className="text-primary" to='/login'>Login</Link></p>
              <button onClick={googleLogin} className="flex mt-5 gap-x-4 items-center box-shadow-1 p-3 rounded-[4px]">
                <img src={google_icon} alt="Google Sign in" className="!h-[25px]" />
                <span>Sign up with Google</span>
              </button>

            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Signup