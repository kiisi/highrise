/* eslint-disable react/prop-types */
import Button from "../components/Button"
import { useReducer } from 'react'
import { toast } from 'react-toastify';
import { base_mailing_endpoint } from "../utils/endpoints";
import { useUserContext } from '../context/userContext'
import { Link, useNavigate } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

const VerifyAccount = () => {

  const navigate = useNavigate()
  const globalState = useUserContext()

  const initState = {
    firstInput: '',
    secondInput: '',
    thirdInput: '',
    fourthInput: ''
  }

  const reducerFunc = (state, action) => {
    switch (action.type) {
      case "FIRST_INPUT": {
        return {
          ...state,
          firstInput: action.payload
        }
      }
      case "SECOND_INPUT": {
        return {
          ...state,
          secondInput: action.payload
        }
      }
      case "THIRD_INPUT": {
        return {
          ...state,
          thirdInput: action.payload
        }
      }
      case "FOURTH_INPUT": {
        return {
          ...state,
          fourthInput: action.payload
        }
      }
      default: {
        throw Error("Unknown Case!")
      }
    }
  }

  const [state, dispatch] = useReducer(reducerFunc, initState)

  const verificationInputHandler = (e, type) => {
    dispatch({ type, payload: e.target.value })
    e.target?.nextElementSibling?.focus()
  }

  console.log(globalState)

  if (!globalState.state && !localStorage.getItem("verification-email")) {
      return <ErrorBoundary />
  }
  if (!globalState.state.verification_email) {
    return <ErrorBoundary />
}

  const email = globalState.state.verification_email.email 


  const btnDisabled = !state.firstInput || !state.secondInput || !state.thirdInput || !state.fourthInput

  const submit = async () => {

    if (!state.firstInput || !state.secondInput || !state.thirdInput || !state.fourthInput) {
      return toast("All inputs are required")
    }

    const otp = state.firstInput + state.secondInput + state.thirdInput + state.fourthInput

    let url = `${base_mailing_endpoint}/auth/verify-otp`

    const settings = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    };

    const res = await fetch(url, settings)
    const result = await res.json()

    console.log(result)

    if (result.success) {
      navigate('/login')
      return toast.success(result.success)
    } else {
      return toast.error(result.error)
    }

  }

  // const resendOtp = () =>{

  // }



  return (
    <main className="min-h-[100vh] w-full py-5 px-6 grid place-items-center">
      <section className="max-w-[450px] w-full rounded-xl p-4 box-shadow-1 verify-email-tab-left">
        <header className="text-center text-[#171D2A]">
          <h1 className="font-extrabold text-[28px]">Verify your email!</h1>
          <p>Please enter the 4 digit code sent to <span className="font-bold text-primary">{email}</span>, <Link to='/login' className="text-primary underline">(not you?)</Link></p>
          <p>The code is valid for 2mins</p>
        </header>
        <div className="py-10 flex">
          <div className="mx-auto max-w-max flex gap-x-3">
            <input className="verification-input" maxLength={1} type="text" value={state.firstInput} onChange={(e) => verificationInputHandler(e, "FIRST_INPUT")} />
            <input className="verification-input" maxLength={1} type="text" value={state.secondInput} onChange={(e) => verificationInputHandler(e, "SECOND_INPUT")} />
            <input className="verification-input" maxLength={1} type="text" value={state.thirdInput} onChange={(e) => verificationInputHandler(e, "THIRD_INPUT")} />
            <input className="verification-input" maxLength={1} type="text" value={state.fourthInput} onChange={(e) => verificationInputHandler(e, "FOURTH_INPUT")} />
          </div>
        </div>
        <div>
          <Button className="w-full mt-4" onClick={submit} disabled={btnDisabled}>Verify Account</Button>
        </div>
      </section>
    </main>
  )
}

export default VerifyAccount

