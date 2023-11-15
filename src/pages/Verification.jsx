/* eslint-disable react/prop-types */
import { useRef, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { base_endpoint } from '../utils/endpoints'
import { PaystackButton } from "react-paystack"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { RadioGroup } from '@headlessui/react'


const VIEWS = {
    DEFAULT_VIEW: "DEFAULT_VIEW",
    DETAILS_VIEW: "DETAILS_VIEW",
    VERIFY_VIEW: "VERIFY_VIEW"
}

export default function Verification() {

    const [view, setView] = useState(VIEWS.DEFAULT_VIEW)
    const [info, setInfo] = useState(null)

    switch (view) {
        case VIEWS.DEFAULT_VIEW: {
            return <DefaultView setView={setView} />
        }
        case VIEWS.VERIFY_VIEW: {
            return <VerifyView setView={setView} setInfo={setInfo} />
        }
        case VIEWS.DETAILS_VIEW: {
            return <DetailsView setView={setView} info={info} />
        }
    }
}

const plans = [
    {
        name: 'Verify your Reference Code',
        view: VIEWS.VERIFY_VIEW
    },
]

const DefaultView = ({ setView }) => {

    const navigate = useNavigate()

    const [selected, setSelected] = useState(null)

    return (
        <main className="bg-[#9a9a9a] min-h-[100vh] grid place-items-center">
            <section className='max-w-[500px] w-full bg-white px-4 py-6 rounded-[10px]'>
                <header>
                    <div className="flex pb-4">
                        <i className="ml-auto fa-solid fa-arrow-right text-[20px]" onClick={() => navigate(-1)}></i>
                    </div>
                    <h1 className="text-primary text-center font-bold text-[20px]">HIGHRISE REFERENCE CODE</h1>
                </header>
                <div className="pt-3">
                    <div className="w-full py-10">
                        <div className="mx-auto w-full">
                            <RadioGroup value={selected} onChange={setSelected}>
                                <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                                <div className="space-y-2">
                                    {plans.map((plan) => (
                                        <RadioGroup.Option
                                            key={plan.name}
                                            value={plan}
                                            className={({ active, checked }) =>
                                                `${active
                                                    ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                                                    : ''
                                                }
                  ${checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                                                }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                            }
                                        >
                                            {({ checked }) => (
                                                <>
                                                    <div className="flex w-full items-center justify-between">
                                                        <div className="flex items-center">
                                                            <div className="text-sm">
                                                                <RadioGroup.Label
                                                                    as="p"
                                                                    className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'
                                                                        }`}
                                                                >
                                                                    {plan.name}
                                                                </RadioGroup.Label>
                                                            </div>
                                                        </div>
                                                        {checked && (
                                                            <div className="shrink-0 text-white">
                                                                <CheckIcon className="h-6 w-6" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </RadioGroup.Option>
                                    ))}
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div>
                        <Button
                            onClick={() => setView(selected.view)}
                            className="w-full"
                            disabled={selected === null ? true : false}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    )
}

function CheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

const VerifyView = ({ setView, setInfo }) => {

    const [showPayStackButton, setShowPayStackButton] = useState(false)
    const [state, setState] = useState(null)

    const referenceCodeRef = useRef()

    const submit = async () => {

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
        if (data.success) {
            setShowPayStackButton(true)
            setState(data)
            setInfo(data)
            toast.success(data.success)
        } else if (data.warn) {
            setState(data)
            setInfo(data)
            setShowPayStackButton(true)
            toast.warn(data.warn)
        }
        else {
            toast.error(data.error)
            console.log(data.error)
        }
    }

    const email = state ? state.data.user.email : "Invalid"
    const amount = state ? state.cost : "Invalid"
    const name = state ? state.data.user.full_name : "Invalid"
    // const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY
    const publicKey = "pk_test_1dbe7c288b9d924fa7f0e9793b1470d186c01f19"
    
    const componentProps = {
        email,
        amount: amount * 100,
        metadata: {
            name
        },
        publicKey,
        text: "Pay Now",
        onSuccess: () => {
            (async () => {
                const referenceCode = referenceCodeRef.current.value

                const res = await fetch(`${base_endpoint}/payment/checkout/verification-payment`, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ reference_code: referenceCode })
                })
                const result = await res.json()

                if (result.success) {
                    toast.success(result.success)
                    console.log(result)
                    defaultStateHandler()
                } else {
                    toast.error(result.error)
                }
            })()
        },
        onClose: () => console.log("Close"),
    }

    const defaultStateHandler = () => {
        setView(VIEWS.DETAILS_VIEW)
    }

    return (
        <main className="bg-[#9a9a9a] min-h-[100vh] grid place-items-center">
            <section className='max-w-[500px] w-full bg-white px-4 py-6 rounded-[10px]'>
                <header>
                    <div className="flex pb-4">
                        <i className="ml-auto fa-solid fa-arrow-right text-[20px]" onClick={() => setView(VIEWS.DEFAULT_VIEW)}></i>
                    </div>
                    <h1 className="text-primary text-center font-bold text-[20px]">VERIFY REFERENCE CODE FOR AUTHENTICITY</h1>
                </header>
                <div className="pt-8">
                    <fieldset className="mb-10">
                        <Input type="text" label="Reference Code" ref={referenceCodeRef} readOnly={showPayStackButton} />
                    </fieldset>
                    <div className="grid place-items-center">
                        {
                            showPayStackButton
                                ?
                                <PaystackButton {...componentProps} className="bg-primary px-10 py-2.5 rounded-md text-white hover:bg-[#310077]" />
                                :
                                <Button onClick={submit}>Verify</Button>
                        }
                    </div>
                </div>
            </section>
        </main>
    )
}

const DetailsView = ({ info, setView }) => {

    let state = info

    const changeView = () =>{
        setView(VIEWS.DEFAULT_VIEW)
    }

    switch (state.data.service_type) {
        case "change-of-name": {
            return (
                <section className="h-[100vh] fixed w-full verify-bg p-6 grid place-items-center overflow-y-auto">
                    <div className="w-full max-w-[500px] rounded-[10px] bg-white box-shadow-1 p-2">
                        <header>
                            <div className="flex justify-end">
                                <i className="fa-solid fa-xmark cursor-pointer text-[20px]" onClick={changeView}></i>
                            </div>
                            <figure className="flex justify-center">
                                <img src={logo} alt="Logo" className="h-[50px]" />
                            </figure>
                        </header>
                        <div className="pt-8 flex flex-col gap-y-4">
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Service Type:</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <p>Change of name</p>
                                </div>
                            </div>
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Old Name:</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <p>{state.data.service.new_name}</p>
                                </div>
                            </div>
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>New Name:</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <p>{state.data.service.old_name}</p>
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
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Passport</h1>
                                </div>
                                <div className="py-1 px-2 flex justify-center">
                                    <img src={state.data.service.passport} alt="Passport" />
                                </div>
                            </div>
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Identification</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <img src={state.data.service.identification} alt="identification" />
                                </div>
                            </div>
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Birth Certificate</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <img src={state.data.service.birth} alt="Birth Certificate" />
                                </div>
                            </div>
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Affidavit</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <img src={state.data.service.affidavit} alt="Affidavit" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
        case "correction-of-name-age": {
            return (
                <section className="h-[100vh] fixed w-full verify-bg p-6 grid place-items-center overflow-y-auto">
                    <div className="w-full max-w-[500px] rounded-[10px] bg-white box-shadow-1 p-2">
                        <header>
                            <div className="flex justify-end">
                                <i className="fa-solid fa-xmark cursor-pointer text-[20px]" onClick={changeView}></i>
                            </div>
                            <figure className="flex justify-center">
                                <img src={logo} alt="Logo" className="h-[50px]" />
                            </figure>
                        </header>
                        <div className="pt-8 flex flex-col gap-y-4">
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Service Type:</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <p>Correction of Name/Age</p>
                                </div>
                            </div>
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Name:</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <p>{state.data.service?.full_name ? state.data.service.full_name : state.data.service.new_name}</p>
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
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Passport</h1>
                                </div>
                                <div className="py-1 px-2 flex justify-center">
                                    <img src={state.data.service.passport} alt="Passport" />
                                </div>
                            </div>
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Identification</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <img src={state.data.service.identification} alt="identification" />
                                </div>
                            </div>
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Birth Certificate</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <img src={state.data.service.birth} alt="Birth Certificate" />
                                </div>
                            </div>
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Affidavit</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <img src={state.data.service.affidavit} alt="Affidavit" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
        case "loss-of-docs": {
            return (
                <section className="h-[100vh] fixed w-full verify-bg p-6 grid place-items-center overflow-y-auto">
                    <div className="w-full max-w-[500px] rounded-[10px] bg-white box-shadow-1 p-2">
                        <header>
                            <div className="flex justify-end">
                                <i className="fa-solid fa-xmark cursor-pointer text-[20px]" onClick={changeView}></i>
                            </div>
                            <figure className="flex justify-center">
                                <img src={logo} alt="HerCode Logo" className="h-[50px]" />
                            </figure>
                        </header>
                        <div className="pt-8 flex flex-col gap-y-4">
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Service Type:</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <p>Loss of Documents</p>
                                </div>
                            </div>
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Full Name:</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <p>{state.data.service.full_name}</p>
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
                                    <h1>NIN</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <p>{state.data.service.nin}</p>
                                </div>
                            </div>
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Passport</h1>
                                </div>
                                <div className="py-1 px-2 flex justify-center">
                                    <img src={state.data.service.passport} alt="Passport" />
                                </div>
                            </div>
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Marriage Certificate</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <img src={state.data.service.marriage} alt="Marriage" />
                                </div>
                            </div>
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Identification</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <img src={state.data.service.identification} alt="identification" />
                                </div>
                            </div>
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Birth Certificate</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <img src={state.data.service.birth} alt="Birth Certificate" />
                                </div>
                            </div>
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Affidavit</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <img src={state.data.service.affidavit} alt="Affidavit" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
        case "public-notice": {
            return (
                <section className="h-[100vh] fixed w-full verify-bg p-6 grid place-items-center overflow-y-auto">
                    <div className="w-full max-w-[500px] rounded-[10px] bg-white box-shadow-1 p-2">
                        <header>
                            <div className="flex justify-end">
                                <i className="fa-solid fa-xmark cursor-pointer text-[20px]" onClick={changeView}></i>
                            </div>
                            <figure className="flex justify-center">
                                <img src={logo} alt="HerCode Logo" className="h-[50px]" />
                            </figure>
                        </header>
                        <div className="pt-8 flex flex-col gap-y-4">
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Service Type:</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <p>Public Notice</p>
                                </div>
                            </div>
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Full Name:</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <p>{state.data.service.full_name}</p>
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
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Passport</h1>
                                </div>
                                <div className="py-1 px-2 flex justify-center">
                                    <img src={state.data.service.passport} alt="Passport" />
                                </div>
                            </div>
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Marriage Certificate</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <img src={state.data.service.marriage} alt="Marriage" />
                                </div>
                            </div>
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Identification</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <img src={state.data.service.identification} alt="identification" />
                                </div>
                            </div>
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Birth Certificate</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <img src={state.data.service.birth} alt="Birth Certificate" />
                                </div>
                            </div>
                            <div className="bg-[#F6F9FC] box-shadow-1">
                                <div className="pt-1 px-2 font-bold">
                                    <h1>Affidavit</h1>
                                </div>
                                <div className="py-1 px-2">
                                    <img src={state.data.service.affidavit} alt="Affidavit" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
    }
}