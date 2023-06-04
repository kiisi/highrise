import Dashboard from "../layout/Dashboard"
import Input from '../components/Input'
import Button from '../components/Button'
import { useReducer } from 'react'
import { Helmet } from 'react-helmet'

const PublicNotice = () => {

    const initState = {
        marriage: null,
        passport: null,
        birth: null,
        affidavit: null,
        identification: null
    }

    const reducerFunc = (state, action) =>{

        switch(action.type){
            case "marriage":{
                return {
                    ...state,
                    marriage: action.payload
                }
            }
            case "passport":{
                return {
                    ...state,
                    passport: action.payload
                }
            }
            case "birth":{
                return {
                    ...state,
                    birth: action.payload
                }
            }
            case "affidavit":{
                return {
                    ...state,
                    affidavit: action.payload
                }
            }
            case "identification":{
                return {
                    ...state,
                    identification: action.payload
                }
            }
            default:{
                throw Error("Unknown Action")
            }
        }
    }

    const [state, dispatch] = useReducer(reducerFunc, initState)

    const fileInputHandler = (e, type) =>{
        dispatch({type: type, payload: e.target.files[0]})
    }

    

    console.log(state)

    return (
        <Dashboard>
            <Helmet>
                <title>Highrise - Public Notice</title>
            </Helmet>
            <main>
                <header className="pt-[25px] pr-[35px] pb-[22px] pl-[38px] shadow-[1px_0_5px_#0000001a]">
                    <h1 className="text-primary text-[24px] font-bold">Public Notice</h1>
                </header>
                <section className="pt-[50px] pr-[35px] pb-[22px] pl-[38px]">
                    <div className="bg-[#fff] p-10">
                        <div className="flex flex-wrap gap-x-10 gap-y-10">
                            <fieldset className="max-w-[400px] w-full">
                                <Input label="Full name" type="text" />
                            </fieldset>
                            <fieldset className="max-w-[400px] w-full">
                                <Input label="Email" type="email" />
                            </fieldset>
                            <fieldset className="max-w-[400px] w-full">
                                <Input label="Phone number" type="number" />
                            </fieldset>
                            <fieldset className="max-w-[400px] w-full">
                                <Input label="Amount (₦)" type="number" />
                            </fieldset>
                        </div>
                        <div className="flex flex-wrap gap-x-10 gap-y-10 mt-16">
                            <fieldset className="max-w-[400px] w-full">
                                <h1>Marriage certificate</h1>
                                    <div className="rounded-xl mt-2 flex p-2 gap-x-2 items-center border-[1px] border-primary w-full max-w-[400px]">
                                        <label htmlFor="marriage-certificate" name="marriage-certificate" className="bg-primary px-10 py-2.5 rounded-md text-white hover:bg-[#310077]">Upload</label>
                                        <input type="file" className="hidden" id="marriage-certificate" onChange={(e) =>  fileInputHandler(e, "marriage")}/>
                                        <span className="whitespace-nowrap truncate flex-1">{state.marriage ? state.marriage.name : "No files currently selected" }</span>
                                    </div>
                            </fieldset>
                            <fieldset className="max-w-[400px] w-full">
                                <h1>Passport photograph</h1>
                                    <div className="rounded-xl mt-2 flex p-2 gap-x-2 items-center border-[1px] border-primary max-w-[400px] w-full">
                                        <label htmlFor="passport-photograph" name="passport-photograph" className="bg-primary px-10 py-2.5 rounded-md text-white hover:bg-[#310077]">Upload</label>
                                        <input type="file" className="hidden" id="passport-photograph" onChange={(e) =>  fileInputHandler(e, "passport")}/>
                                        <span className="whitespace-nowrap truncate">{state.passport ? state.passport.name : "No files currently selected" }</span>
                                    </div>
                            </fieldset>
                            <fieldset className="max-w-[400px] w-full">
                                <h1>Birth certificate</h1>
                                    <div className="rounded-xl mt-2 flex p-2 gap-x-2 items-center border-[1px] border-primary w-full max-w-[400px]">
                                        <label htmlFor="birth-certificate" name="birth-certificate" className="bg-primary px-10 py-2.5 rounded-md text-white hover:bg-[#310077]">Upload</label>
                                        <input type="file" className="hidden" id="birth-certificate" onChange={(e) =>  fileInputHandler(e, "birth")}/>
                                        <span className="whitespace-nowrap truncate">{state.birth ? state.birth.name : "No files currently selected" }</span>
                                    </div>
                            </fieldset>
                            <fieldset className="max-w-[400px] w-full">
                                <h1>Affidavit</h1>
                                    <div className="rounded-xl mt-2 flex p-2 gap-x-2 items-center border-[1px] border-primary max-w-[400px] w-full">
                                        <label htmlFor="affidavit" name="affidavit" className="bg-primary px-10 py-2.5 rounded-md text-white hover:bg-[#310077]">Upload</label>
                                        <input type="file" className="hidden" id="affidavit" onChange={(e) =>  fileInputHandler(e, "affidavit")}/>
                                        <span className="whitespace-nowrap truncate">{state.affidavit ? state.affidavit.name : "No files currently selected" }</span>
                                    </div>
                            </fieldset>
                            <fieldset className="max-w-[400px] w-full">
                                <h1>Identification(NIN,Voters Card,Driving licence)</h1>
                                    <div className="rounded-xl flex mt-2 p-2 gap-x-2 items-center border-[1px] border-primary w-full max-w-[400px]">
                                        <label htmlFor="identification" name="identification" className="bg-primary px-10 py-2.5 rounded-md text-white hover:bg-[#310077]">Upload</label>
                                        <input type="file" className="hidden" id="identification" onChange={(e) =>  fileInputHandler(e, "identification")}/>
                                        <span className="whitespace-nowrap truncate">{state.identification ? state.identification.name : "No files currently selected" }</span>
                                    </div>
                            </fieldset>
                        </div>

                        <Button className="mt-14 ml-1">Next</Button>
                    </div>
                </section>
            </main>
        </Dashboard>
    )
}

export default PublicNotice