import Dashboard from "../layout/Dashboard"
import Input from '../components/Input'
import Button from '../components/Button'
import { useReducer, useRef, useState } from 'react'
import { base_endpoint } from "../utils/endpoints"
import { useUserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"
import Spinner from '../components/Spinner'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify';

const ChangeName = () => {

    const navigate = useNavigate()
    const globalState = useUserContext()
    const [loading, setLoading] = useState(false)

    const oldNameRef = useRef()
    const newNameRef = useRef()
    const confirmNewNameRef = useRef()
    const emailRef = useRef()
    const amountRef = useRef()
    const numberRef = useRef()
    const ninRef = useRef()

    const initState = {
        passport: null,
        birth: null,
        affidavit: null,
        identification: null
    }
    const reducerFunc = (state, action) => {

        switch (action.type) {
            case "passport": {
                return {
                    ...state,
                    passport: action.payload
                }
            }
            case "birth": {
                return {
                    ...state,
                    birth: action.payload
                }
            }
            case "affidavit": {
                return {
                    ...state,
                    affidavit: action.payload
                }
            }
            case "identification": {
                return {
                    ...state,
                    identification: action.payload
                }
            }
            default: {
                throw Error("Unknown Action")
            }
        }
    }

    const [state, dispatch] = useReducer(reducerFunc, initState)

    const fileInputHandler = (e, type) => {
        dispatch({ type: type, payload: e.target.files[0] })
    }

    const submit = async () => {
        let oldName = oldNameRef.current.value
        let newName = newNameRef.current.value
        let confirmNewName = confirmNewNameRef.current.value
        let email = emailRef.current.value
        let amount = amountRef.current.value
        let number = numberRef.current.value
        let nin = ninRef.current.value

        if (!oldName || !newName || !confirmNewName || !email || !amount || !number || !state.passport || !state.birth || !state.affidavit || !state.identification || !nin) {
            return toast.error("All Fields are required!")
        }

        let url = `${base_endpoint}/documents/change-of-name/uploads`

        const files = [state.passport, state.birth, state.affidavit, state.identification]
        const files_url = {}
        const formData = new FormData()
        formData.append("upload_preset", "highrise")
        formData.append("cloud_name", "destinyfelixkiisi")
        formData.append("folder", "highrise")

        // Start loading spinner

        setLoading(true)

        const fetchedPromise = files.map(file => {

            formData.append("file", file)

            return fetch("https://api.cloudinary.com/v1_1/destinyfelixkiisi/image/upload", {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                    toast.error("Uploading failed!")
                })
        })

        Promise.all(fetchedPromise)
            .then(results => {
                results.forEach((result, i) => {
                    switch (i) {
                        case 0: {
                            files_url.passport = result.url
                            break;
                        }
                        case 1: {
                            files_url.birth = result.url
                            break
                        }
                        case 2: {
                            files_url.affidavit = result.url
                            break
                        }
                        case 3: {
                            files_url.identification = result.url
                            break;
                        }
                        default: {
                            throw Error("Exceeded Limit")
                        }
                    }
                })

                // Send request to backend server
                const data = {
                    user: globalState.state.user._id,
                    old_name: oldName,
                    new_name: newName,
                    confirm_new_name: confirmNewName,
                    amount: amount,
                    email: email,
                    phone_number: number,
                    nin: nin,
                    ...files_url
                }

                const settings = {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }

                fetch(url, settings)
                    .then(res => res.json())
                    .then(result => {
                        if(result.success){
                            globalState.dispatch({
                                type: "SERVICE", payload: {
                                    type: "Change Of Name",
                                    amount: amount,
                                    serviceId: result.data._id,
                                    route:'change-of-name'
                                }
                            })
                            return navigate('/dashboard/payment')
                        }else{
                            setLoading(false)
                        }
                    })
                    .catch(err => {
                        setLoading(false)
                        console.log(err)
                    })
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }

    return (
        <Dashboard>
            {loading ? <Spinner /> : null}
            <main>
                <Helmet>
                    <title>Highrise - Change Of Name</title>
                </Helmet>
                <header className="pt-[25px] pr-[35px] pb-[22px] pl-[38px] shadow-[1px_0_5px_#0000001a]">
                    <h1 className="text-primary text-[24px] font-bold">Change Of Name Registration Form</h1>
                </header>
                <section className="pt-[50px] pr-[35px] pb-[22px] pl-[38px]">
                    <div className="bg-[#fff] p-10">
                        <div className="flex flex-wrap gap-x-10 gap-y-10">
                            <fieldset className="max-w-[400px] w-full">
                                <Input label="Old name" type="text" ref={oldNameRef} />
                            </fieldset>
                            <fieldset className="max-w-[400px] w-full">
                                <Input label="New name" type="text" ref={newNameRef} />
                            </fieldset>
                            <fieldset className="max-w-[400px] w-full">
                                <Input label="Confirm New name" type="text" ref={confirmNewNameRef} />
                            </fieldset>
                            <fieldset className="max-w-[400px] w-full">
                                <Input label="Email" type="email" ref={emailRef} />
                            </fieldset>
                            <fieldset className="max-w-[400px] w-full">
                                <Input label="Amount (₦)" type="number" ref={amountRef} readOnly={true} defaultValue={4500} />
                            </fieldset>
                            <fieldset className="max-w-[400px] w-full">
                                <Input label="Phone number" type="number" min={0} ref={numberRef} />
                            </fieldset>
                            <fieldset className="max-w-[400px] w-full">
                                <Input label="National Identification Number (NIN)" type="number" min={0} ref={ninRef} />
                            </fieldset>
                        </div>
                        <div className="flex flex-wrap gap-x-10 gap-y-10 mt-16">
                            <fieldset className="max-w-[400px] w-full">
                                <h1>Passport photograph</h1>
                                <div className="rounded-xl mt-2 flex p-2 gap-x-2 items-center border-[1px] border-primary max-w-[400px] w-full">
                                    <label htmlFor="passport-photograph" name="passport-photograph" className="bg-primary px-10 py-2.5 rounded-md text-white hover:bg-[#310077]">Upload</label>
                                    <input type="file" className="hidden" id="passport-photograph" onChange={(e) => fileInputHandler(e, "passport")} name="passport" />
                                    <span className="whitespace-nowrap truncate">{state.passport ? state.passport.name : "No files currently selected"}</span>
                                </div>
                            </fieldset>
                            <fieldset className="max-w-[400px] w-full">
                                <h1>Birth certificate</h1>
                                <div className="rounded-xl mt-2 flex p-2 gap-x-2 items-center border-[1px] border-primary w-full max-w-[400px]">
                                    <label htmlFor="birth-certificate" name="birth-certificate" className="bg-primary px-10 py-2.5 rounded-md text-white hover:bg-[#310077]">Upload</label>
                                    <input type="file" className="hidden" id="birth-certificate" onChange={(e) => fileInputHandler(e, "birth")} />
                                    <span className="whitespace-nowrap truncate">{state.birth ? state.birth.name : "No files currently selected"}</span>
                                </div>
                            </fieldset>
                            <fieldset className="max-w-[400px] w-full">
                                <h1>Affidavit</h1>
                                <div className="rounded-xl mt-2 flex p-2 gap-x-2 items-center border-[1px] border-primary max-w-[400px] w-full">
                                    <label htmlFor="affidavit" name="affidavit" className="bg-primary px-10 py-2.5 rounded-md text-white hover:bg-[#310077]">Upload</label>
                                    <input type="file" className="hidden" id="affidavit" onChange={(e) => fileInputHandler(e, "affidavit")} />
                                    <span className="whitespace-nowrap truncate">{state.affidavit ? state.affidavit.name : "No files currently selected"}</span>
                                </div>
                            </fieldset>
                            <fieldset className="max-w-[400px] w-full">
                                <h1>Identification(NIN,Voters Card,Driving licence)</h1>
                                <div className="rounded-xl flex mt-2 p-2 gap-x-2 items-center border-[1px] border-primary w-full max-w-[400px]">
                                    <label htmlFor="identification" name="identification" className="bg-primary px-10 py-2.5 rounded-md text-white hover:bg-[#310077]">Upload</label>
                                    <input type="file" className="hidden" id="identification" onChange={(e) => fileInputHandler(e, "identification")} />
                                    <span className="whitespace-nowrap truncate">{state.identification ? state.identification.name : "No files currently selected"}</span>
                                </div>
                            </fieldset>
                        </div>

                        <Button className="mt-14 ml-1" onClick={submit}>Next</Button>
                    </div>
                </section>
            </main>
        </Dashboard>
    )
}

export default ChangeName
