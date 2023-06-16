import { useRef, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { base_endpoint } from '../utils/endpoints'
import { PaystackButton } from "react-paystack"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/userContext'


const Verification = () => {

    const [showPayStackButton, setShowPayStackButton] = useState(false)

    const navigate = useNavigate()
    const { state } = useUserContext()

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
            setShowPayStackButton(data.success)
        }else{
            toast.error(data.error)
            console.log(data.error)
        }
    }

    const email = state.user.email
    const amount = 10000
    const name = state.user.full_name
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

                console.log(result)
                
                if(result.success){
                    toast.success(result.success)
                    navigate('/profile')
                }else{
                    toast.error(result.error)
                }
            })()
        },
        onClose: () => console.log("Close"),
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
        </main>
    )
}

export default Verification