import { useRef, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { base_endpoint } from '../utils/endpoints'
import { PaystackButton } from "react-paystack"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'

const Verification = () => {

    const [showPayStackButton, setShowPayStackButton] = useState(false)
    const [state, setState] = useState(null)

    const navigate = useNavigate()

    const referenceCodeRef = useRef()

    const submit = async () =>{

        const referenceCode = referenceCodeRef.current.value

        const settings = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ reference_code: referenceCode }),
        };

        let res = await fetch(`${base_endpoint}/payment/checkout/verification`, settings)

        let data = await res.json()

        console.log(data)
        if(data.success){
            setShowPayStackButton(true)
            setState(data)
            toast.success(data.success)
        }else if(data.warn){
            setState(data)
            toast.warn(data.warn)
        }
        else{
            toast.error(data.error)
            console.log(data.error)
        }
    }

    const email = state ? state.data.user.email : "Invalid"
    const amount = 10000
    const name = state ? state.data.user.full_name : "Invalid"
    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY

    const componentProps = {
        email,
        amount: amount * 100,
        metadata: {
            name
        },
        publicKey,
        text: "Pay Now",
        onSuccess: () =>{
            (async()=>{
                const referenceCode = referenceCodeRef.current.value

                const res = await fetch(`${base_endpoint}/payment/checkout/verification-payment`,{
                    method:"post",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({ reference_code: referenceCode })
                }) 
                const result = await res.json()
                
                if(result.success){
                    toast.success(result.success)
                    defaultStateHandler()
                }else{
                    toast.error(result.error)
                }
            })()
        },
        onClose: () => console.log("Close"),
    }

    const defaultStateHandler = () =>{
        setShowPayStackButton(false)
        setState(null)
    }

    return (
        <main className="bg-[#9a9a9a] min-h-[100vh] grid place-items-center">
            <section className='max-w-[500px] w-full bg-white px-4 py-6'>
                <header>
                    <div className="flex pb-4">
                    <i className="ml-auto fa-solid fa-arrow-right text-[20px]" onClick={() => navigate('/profile')}></i>
                    </div>
                    <h1 className="text-primary text-center font-bold text-[20px]">VERIFY REFERENCE CODE FOR AUTHENTICITY</h1>
                </header>
                <div className="pt-10">
                    <fieldset className="mb-10">
                        <Input type="text" label="Reference Code" ref={referenceCodeRef} readOnly={showPayStackButton}/>
                    </fieldset>
                    <div className="grid place-items-center">
                        {
                            showPayStackButton 
                            ?
                            <PaystackButton {...componentProps} className="bg-primary px-10 py-2.5 rounded-md text-white hover:bg-[#310077]"/>
                            :
                            <Button onClick={submit}>Verify</Button>
                        }
                    </div>
                </div>
            </section>
            {
            state && state.data && state.data.verified_reference_code &&
            <section className="min-h-[100vh] fixed w-full verify-bg p-6 grid place-items-center">
                <div className="w-full max-w-[500px] rounded-[10px] bg-white box-shadow-1 p-2">
                    <header>
                        <div className="flex justify-end">
                            <i className="fa-solid fa-xmark cursor-pointer text-[20px]" onClick={defaultStateHandler}></i>
                        </div>
                        <figure className="flex justify-center">
                            <img src={logo} alt="HerCode Logo" className="h-[50px]" />
                        </figure>
                    </header>
                    <div className="pt-8 flex flex-col gap-y-4">
                        <div className="bg-[#F6F9FC] box-shadow-1">
                            <div className="pt-1 px-2 font-bold">
                                <h1>Name:</h1>
                            </div>
                            <div className="py-1 px-2">
                                <p>{state.data.service?.full_name ? state.data.service.full_name : state.data.service.new_name }</p>
                            </div>
                        </div>
                        <div className="bg-[#F6F9FC] box-shadow-1">
                            <div className="pt-1 px-2 font-bold">
                                <h1>Email:</h1>
                            </div>
                            <div className="py-1 px-2">
                                <p>{state.data.service.email}</p>
                            </div>
                        </div>
                        <div className="bg-[#F6F9FC] box-shadow-1">
                            <div className="pt-1 px-2 font-bold">
                                <h1>Phone number:</h1>
                            </div>
                            <div className="py-1 px-2">
                                <p>{state.data.service.phone_number}</p>
                            </div>
                        </div>
                        <div className="bg-[#F6F9FC] box-shadow-1">
                            <div className="pt-1 px-2 font-bold">
                                <h1>NIN</h1>
                            </div>
                            <div className="py-1 px-2">
                                <p>{state.data.service.nin}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            }
        </main>
    )
}

export default Verification