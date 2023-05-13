import Navbar from "../layout/Navbar"
import Footer from "../layout/Footer"
import hero_img from '../assets/hero.svg'
import Button from "../components/Button"
import how_it_works_img from '../assets/howitworks.svg'

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Services />
            <HowItWorks/>
            <Footer />
        </>
    )
}

export default Home

const Hero = () => {

    return (
        <header className="py-[5rem] px-8 max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-10 justify-between">
            <div className="max-w-[40rem] mt-20">
                <h1 className="text-[55px] font-bold">Highrise <span className="text-sec">News</span>paper</h1>
                <p className="my-4 text-[20px]">With HighRise you can now apply for change of names, apply affidavit for declaration of age loss of documents etc from your bed!!!</p>
                <Button className="mt-5">Get Started</Button>
            </div>
            <div>
                <img src={hero_img} alt="Hero" />
            </div>
        </header>
    )
}


const service_data = [
    {
        icon:'fa-solid fa-id-card',
        title: 'CHANGE OF NAMES',
        text: 'You can now apply for change of names and obtain approved documents'
    },
    {
        icon: 'fa fa-newspaper-o',
        title: 'LOSS OF DOCUMENTS',
        text: 'Apply for loss of documents request now and obtain an affidavit'
    },
    {
        icon:'fa fa-bullhorn',
        title: 'PUBLIC NOTICE',
        text: 'Start your public notice by selecting the location and fill the forms provided'
    },
    {
        icon:'fa-solid fa-circle-check',
        title: 'AFFIDAVIT REQUEST',
        text: 'Click on the start button and select request for affidavit and get a signed affidavit'
    },
]

const Services = () => {

    return (
        <section className="max-w-xl mx-auto px-8 py-[5rem]">
            <header className="mb-16 text-center max-w-[35rem] mx-auto">
                <h1 className="text-center text-[40px] text-primary font-bold">Our Services</h1>
                <p className="text-[20px]">Our aim is to provide you with standard service delivery in a courteous and timely mannner</p>
            </header>
            <div className="grid grid-cols-1 ss:grid-cols-2 gap-x-5 gap-y-5 mx-auto max-w-[55rem]">
                {
                    service_data.map((d, i) => (
                        <article key={i} className="p-[2rem] rounded-[5px] border-[1px] border-[#666] grid place-items-center text-center bg-[#f8f8f8]">
                            <div><i className={`${d?.icon} text-[32px] text-primary`}></i></div>
                            <div>
                                <h1 className="font-bold text-[17px] my-3">{d.title}</h1>
                                <p className="text-[15px]">{d.text}</p>
                            </div>
                        </article>
                    ))
                }

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

const HowItWorks = () =>{

    return (
        <section className="max-w-xl mx-auto px-8 py-[5rem]">
            <header className="mb-16 text-center max-w-[35rem] mx-auto">
                <h1 className="text-[40px] text-primary font-bold">HOW IT WORKS</h1>
                <p className="text-[20px]">Follow the rubric below to maximize your understanding and usage of the website&rsquo;s features</p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 items-center">
                <figure>
                    <img src={how_it_works_img} alt="How it works"/>
                </figure>
                <div>
                    <ul>
                        {
                            hwt_data.map((d, i)=>(
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