import Navbar from "../layout/Navbar"
import Footer from "../layout/Footer"
import hero_img from '../assets/hero.svg'
import Button from "../components/Button"
import how_it_works_img from '../assets/howitworks.svg'
import { Link } from "react-router-dom"
import dayjs from 'dayjs'
import { Helmet } from "react-helmet"
import { useState } from "react"

const Home = () => {

    return (
        <>
            <Helmet>
                <title>Highrise</title>
            </Helmet>
            <Time />
            <Navbar />
            <Hero />
            <Services />
            <HowItWorks />
            <Chat />
            <Footer />
        </>
    )
}

export default Home

const Time = () => {

    const date = dayjs(Date.now()); // Create a dayjs object with the date you want to format
    const formattedDate = date.format('dddd D MMMM YYYY'); // Format the date using the 'dddd D MMMM YYYY' string format

    return (
        <div className="w-full py-3 bg-[#0A0F15]">
            <div className="max-w-xl mx-auto px-4 ss:px-8">
                <div className="text-white">
                    <p>{formattedDate}</p>
                </div>
            </div>
        </div>
    )
}

const Hero = () => {

    return (
        <header className="py-[5rem] page-offset px-4 ss:px-8 max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-10 justify-between">
            <div className="max-w-[40rem] mt-14">
                <h1 className="text-[36px] ss:text-[55px] font-bold">Highrise <span className="text-sec">News</span>paper</h1>
                <p className="my-4 text-[18px] ss:text-[20px]">With HighRise you can now apply for change of names, apply affidavit for declaration of age, loss of documents etc from your bed!!!</p>
                <div className='flex gap-x-2 gap-y-4 mt-5 flex-wrap'>
                    <Link to="/signup" className="block w-full min-[500px]:w-fit">
                        <Button className="w-full ">Get Started</Button>
                    </Link>
                    <Link to="/verification" className="block w-full min-[500px]:w-fit">
                        <Button className="w-full bg-white !text-primary border-[1px] border-primary font-semibold hover:!text-white">Start Verification</Button>
                    </Link>
                </div>
            </div>
            <div>
                <img src={hero_img} alt="Hero" />
            </div>
        </header>
    )
}


const service_data = [
    {
        icon: 'fa-solid fa-id-card',
        title: 'Change of Names',
        text: 'You can now apply for change of names and obtain approved documents',
        price: '3,000',
        to: '/dashboard/change-of-name'
    },
    {
        icon: 'fa fa-newspaper-o',
        title: 'Loss of Documents',
        text: 'Apply for loss of documents request now and obtain an affidavit',
        price: '4,000',
        to: '/dashboard/loss-of-docs'

    },
    {
        icon: 'fa fa-bullhorn',
        title: 'Public Notice',
        text: 'Start your public notice by signing up and filling the forms on your dashboard',
        price: '4,000',
        to: '/dashboard/public-notice'
    },
    {
        icon: 'fa-solid fa-id-card',
        title: 'Correction of name/age',
        text: 'You can now apply for correction of names/age and obtain approved documents',
        price: '3,000',
        to: '/dashboard/correction-of-name-age'
    },
    {
        icon: 'fa-solid fa-id-card',
        title: 'Company Trustees',
        text: 'You can now apply for correction of names/age and obtain approved documents',
        price: '15,000',
        to: '/dashboard/correction-of-name-age'
    },
]

const Services = () => {

    const [open, setOpen] = useState(false)

    const btnHandler = (val) => setOpen(val)

    return (
        <section className="px-4 ss:px-8 max-w-xl mx-auto px-8 py-[5rem]" id="about">
            <header className="mb-16 text-center max-w-[35rem] mx-auto">
                <h1 className="text-center text-[32px] ss:text-[40px] text-primary font-bold">Our Services</h1>
                <p className="text-[18px] ss:text-[20px]">Our aim is to provide you with standard service delivery in a courteous and timely manner</p>
            </header>
            <div className="grid grid-cols-1 ss:grid-cols-2 gap-x-5 gap-y-5 mx-auto max-w-[55rem]">
                {
                    service_data.map((d, i) => (
                        <article key={i} className="p-[2rem] rounded-[10px] border-[1px] hover:border-[#666] box-shadow bg-[#f8f8f8]">
                            <div className='flex flex-col gap-y-5'>
                                <h1 className="font-bold text-[17px] my-3">{d.title}</h1>
                                <h2 className="text-[36px] font-semibold">₦{d.price}</h2>
                                <div><i className={`${d?.icon} text-[32px] text-primary`}></i></div>
                                <p className="text-[15px] mb-4">{d.text}</p>
                            </div>
                            <Link to={d.to}>
                                <button className="py-2 w-full px-2 mt-3 text-center text-white bg-primary hover:bg-[#310077] rounded-[10px]">Purchase</button>
                            </Link>
                        </article>
                    ))
                }
                <article className="p-[2rem] rounded-[10px] border-[1px] hover:border-[#666] box-shadow bg-[#f8f8f8]">
                    <div className='flex flex-col gap-y-5'>
                        <h1 className="font-bold text-[17px] my-3">Affidavit</h1>
                        <h2 className="text-[36px] font-semibold">&nbsp;</h2>
                        <div><i className="fa-solid fa-circle-check text-[32px] text-primary"></i></div>
                        <p className="text-[15px] mb-4">Click on the GET NOW button below and select high court</p>
                    </div>

                    {
                        open ?
                            <div className={`z-[555] rounded-[10px] shadow-[0_0_20px_#00000033] cursor-pointer bg-white`}>
                                <a onClick={() => btnHandler(false)} target='blank' href='https://affidavit.abiahighcourt.org' className='flex gap-x-2 px-3 py-3 hover:bg-[#f1f1f1]'>
                                    <span className="material-icons"> open_in_new </span>
                                    <span>Abia state high court online affidavit</span>
                                </a>
                                <a onClick={() => btnHandler(false)} target='blank' href='https://comis.oyostatejudiciary.oy.gov.ng/account.html' className='flex gap-x-2 px-3 py-3 hover:bg-[#f1f1f1]'>
                                    <span className="material-icons"> open_in_new </span>
                                    <span>Oyo state high court online affidavit</span>
                                </a>
                            </div>
                            :
                            <button onClick={() => btnHandler(true)} className="py-2 w-full px-2 mt-3 text-center text-white bg-primary hover:bg-[#310077] rounded-[10px]">Get Now</button>
                    }
                </article>
            </div>
        </section>
    )
}


const hwt_data = [
    "Click on the start button to sign up with your credentials",
    "Select the request you want to apply for.",
    "Fill the request form and upload your  documents.",
    "Then complete the payment process.",
    "Check your email for your approval message and next download your document.",
    "Click on the verify button above to verify."
]

const HowItWorks = () => {

    return (
        <section className="max-w-xl px-4 ss:px-8 mx-auto px-8 pt-[5rem] pb-[10rem]">
            <header className="mb-16 text-center max-w-[35rem] mx-auto">
                <h1 className="text-[32px] ss:text-[40px] text-primary font-bold">How It Works</h1>
                <p className="text-[18px] ss:text-[20px]">Follow the rubric below to maximize your understanding and usage of the website&rsquo;s features</p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 items-center">
                <figure>
                    <img src={how_it_works_img} alt="How it works" />
                </figure>
                <div>
                    <ul>
                        {
                            hwt_data.map((d, i) => (
                                <li key={i} className="text-[17px] ss:text-[20px] flex gap-x-5 mb-5">
                                    <i className="ph-fill ph-seal-check text-2xl ss:text-3xl
                                font-bold"></i> {d}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}


const Chat = () => {

    return (
        <button className="h-[50px] w-[50px] bg-primary grid place-items-center rounded-[50%] fixed bottom-[2%] right-[2%] box-shadow">
            <span className="material-icons text-white"> chat </span>
        </button>
    )
}