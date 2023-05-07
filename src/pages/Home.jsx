import Button from "../components/Button"
import Navbar from "../layout/Navbar"
import Footer from "../layout/Footer"
import lines from '../assets/ar1.png'
import light from '../assets/li.png'
import v1 from '../assets/v1.png'
import v2 from '../assets/v2.png'
import dep from '../assets/dep.png'
import wo14 from '../assets/wo14.png'
import wo13 from '../assets/wo13 1.png'
import wo12 from '../assets/ev1.png'
import wo11 from '../assets/ev.png'
import join from '../assets/join.png'
import join1 from '../assets/join1.png'
import fb from '../assets/fb.svg'
import ig from '../assets/ig.svg'
import tt from '../assets/tt.svg'
import pt from '../assets/pt.svg'
import map from '../assets/map-image.svg'
import mail from '../assets/mail.svg'
import phone from '../assets/phone.svg'
import location from '../assets/location.svg'

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Expertise />
            <Events />
            <Community />
            <Contact/>
            <Footer/>
        </>
    )
}

export default Home

const Hero = () => {

    return (
        <header className="bg-dark py-[8rem] px-6 home-hero-bg">
            <div className="grid place-items-center gap-y-10 max-w-[48rem] mx-auto">
                <h1 className="text-[40px] text-white text-center font-bold">Her Code Event encourages more women in tech and sustains women already in tech</h1>
                <p className="text-white text-center text-[24px] opacity-80">We provide you women interested in tech with free Bootcamps, webinars, events, coaching sessions and lots more. Start your career in tech today by joining Her Code Event. Subscribe for our daily tech digest  to stay updated.</p>
                <Button>Connect</Button>
            </div>
        </header>
    )
}

const About = () => {

    return (
        <section className="bg-dark py-[5rem] px-6">
            <div className="rounded-xl w-full max-w-[40rem] bg-[#22252C] mx-auto flex overflow-hidden py-20 gap-x-16 max-w-[60rem]">
                <div>
                    <div className="text-white pl-20 pt-10">
                        <h1 className="font-bold text-[40px]">About Her Code Event</h1>
                        <p className="opacity-80">We are an innovative and tech focused non profit organization that
                            are working towards embracing gender equality in the tech space.</p>
                    </div>
                    <div>
                        <img src={lines} alt="Lines" />
                    </div>
                </div>
                <div className="pr-10 flex flex-col gap-y-5">
                    <div className="bg-dark p-5 rounded-xl text-white grid place-items-center text-center">
                        <div>
                            <img src={light} alt="Light" />
                        </div>
                        <div>
                            <h1 className="mb-4 mt-1">Vision</h1>
                            <p>To encourage more women
                                in tech by reaching out to
                                all women in the world.</p>
                        </div>
                    </div>
                    <div className="bg-dark p-5 rounded-xl text-white grid place-items-center text-center">
                        <div>
                            <img src={v1} alt="Light" />
                        </div>
                        <div>
                            <h1 className="mb-4 mt-1">Vision</h1>
                            <p>To encourage more women
                                in tech by reaching out to
                                all women in the world.</p>
                        </div>
                    </div>
                    <div className="bg-dark p-5 rounded-xl text-white grid place-items-center text-center">
                        <div>
                            <img src={v2} alt="Light" />
                        </div>
                        <div>
                            <h1 className="mb-4 mt-1">Vision</h1>
                            <p>To encourage more women
                                in tech by reaching out to
                                all women in the world.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


const Expertise = () => {

    return (
        <section className="bg-dark py-[5rem] px-6">
            <div>
                <header className="mb-16">
                    <h1 className="text-[40px] text-white text-center font-bold">Deep Expertise</h1>
                </header>
                <div className="max-w-fit mx-auto flex gap-x-20">
                    <div className="flex flex-col justify-between">
                        <div className="text-white text-center bg-[#22252C] rounded-md px-4 py-2 max-w-[14rem] w-full">
                            <h2 className="font-semibold text-[18px] mb-1">Community</h2>
                            <p className="opacity-80 text-[15px]">20,0000 community members</p>
                        </div>
                        <div className="translate-x-16 text-white text-center bg-[#22252C] rounded-md px-4 py-2 max-w-[14rem] w-full">
                            <h2 className="font-semibold text-[18px] mb-1">Bootcamp</h2>
                            <p className="opacity-80 text-[15px]">500 female bootcamp
                                graduates.</p>
                        </div>
                        <div className="text-white text-center bg-[#22252C] rounded-md px-4 py-2 max-w-[14rem] w-full">
                            <h2 className="font-semibold text-[18px] mb-1">Countries</h2>
                            <p className="opacity-80 text-[15px]">Available in 10 countries</p>
                        </div>
                    </div>
                    <figure>
                        <img src={dep} alt="Dep" />
                    </figure>
                    <div className="flex flex-col h-[17rem] mt-auto justify-between">
                        <div className="translate-x-[-4rem] text-white text-center bg-[#22252C] rounded-md px-4 py-2 max-w-[14rem] w-full">
                            <h2 className="font-semibold text-[18px] mb-1">Work Stations</h2>
                            <p className="opacity-80 text-[15px]">50 work stations</p>
                        </div>
                        <div className="text-white text-center bg-[#22252C] rounded-md px-4 py-2 max-w-[14rem] w-full">
                            <h2 className="font-semibold text-[18px] mb-1">Events</h2>
                            <p className="opacity-80 text-[15px]">50 successful events</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


const Events = () => {

    return (
        <section className="bg-dark py-[5rem] px-6">
            <div className="max-w-xl mx-auto">
            <header className="mb-8">
                <h1 className="text-[40px] text-white text-center font-bold">Latest Events</h1>
            </header>
            <div className="flex gap-x-6 justify-between">
                <div>
                    <figure>
                        <img src={wo14} alt="UK Women Submit" />
                    </figure>
                    <figcaption className="text-white pt-5">
                        <h2 className="font-bold">UK Women Submit</h2>
                        <p className="text-[14px] opacity-80 mb-2 mt-1">Wed 3rd April 2023, 9:00 AM</p>
                        <a className="underline">See more</a>
                    </figcaption>
                </div>
                <div>
                    <figure>
                        <img src={wo13} alt="Female Programmers Award" />
                    </figure>
                    <figcaption className="text-white pt-5">
                        <h2 className="font-bold">Female Programmers Award</h2>
                        <p className="text-[14px] opacity-80 mb-2 mt-1">Sat 5th May 2023, 10:00 AM</p>
                        <a className="underline">See more</a>
                    </figcaption>
                </div>
                <div>
                    <figure>
                        <img src={wo11} alt="Entry Level Data Analysis Camp" />
                    </figure>
                    <figcaption className="text-white pt-5">
                        <h2 className="font-bold">Entry Level Data Analysis Camp</h2>
                        <p className="text-[14px] opacity-80 mb-2 mt-1">Mon 7th June 2023, 12:00 PM</p>
                        <a className="underline">See more</a>
                    </figcaption>
                </div>
                <div>
                    <figure>
                        <img src={wo12} alt="Cyber Queens" />
                    </figure>
                    <figcaption className="text-white pt-5">
                        <h2 className="font-bold">Cyber Queens</h2>
                        <p className="text-[14px] opacity-80 mb-2 mt-1">Sat 5th May 2023, 10:00 AM</p>
                        <a className="underline">See more</a>
                    </figcaption>
                </div>
            </div>
            </div>
        </section>
    )
}

const Community = () => {

    return (
        <section className="bg-dark py-[5rem] px-6">
            <div className="p-10 bg-[#22252C] rounded-xl mx-auto max-w-fit">
                <div className="flex gap-x-2 justify-between">
                    <figure className='max-w-[223px] w-full'>
                        <img src={join1} alt="Join Her Code Community" />
                    </figure>
                    <div className="text-white text-center w-full max-w-[33rem]">
                        <h1 className="text-[32px] font-bold">Join Her Code Community </h1>
                        <p className="text-[20px] opacity-80 my-5">We are fast in growing our community. Join us on slack, discord, Telegram  and follow us on our socials to stay updated</p>
                        <Button>Connect</Button>
                    </div>
                    <figure className='max-w-[223px] w-full'>
                        <img src={join} alt="We are fast in growing our community" />
                    </figure>
                </div>
                <div className="mt-8">
                    <figure className="flex gap-x-2 max-w-fit mx-auto">
                        <img src={fb} alt="Facebook Icon"/>
                        <img src={ig} alt="Instagram Icon"/>
                        <img src={tt} alt="Twitter Icon"/>
                        <img src={pt} alt="Pinterest Icon"/>
                    </figure>
                </div>
                <div className="mt-8 mx-auto max-w-[35rem]">
                    <h2 className="text-center text-white font-bold text-[18px]">Subscribe to our daily digest</h2>
                    <form className="flex gap-x-2 mt-5">
                        <input className="h-[45px] w-full rounded-l-md bg-dark px-4 py-1" placeholder="Enter Your Email Address"/>
                        <Button className="rounded-l-none">Submit</Button>
                    </form>
                </div>
            </div>
            <div className="mt-10 text-white text-center max-w-[40rem] mx-auto">
                <h1 className="text-center text-[24px] font-bold mb-3">Partnerships and sponsorships </h1>
                <p className="opacity-80 text-[22px]">Sponsor  our Events and Bootcamps to reach out to more
                    women in the tech. Partner with us to reach more audience</p>
                <div className="text-white flex max-w-fit mx-auto mt-2 underline items-center">
                    <a>Partner</a>
                    <div className="w-[2px] h-[30px] bg-white mx-3"></div>
                    <a>Sponsor</a>
                </div>
            </div>
        </section>
    )
}


const Contact = () =>{

    return (
        <section className="bg-dark py-[5rem] px-6">
            <div className="mx-auto max-w-[70rem] flex gap-x-16">
                <figure>
                    <img src={map} alt="Map Image"/>
                    <figcaption className="py-4 bg-[#0888B8] flex text-white text-[12px] gap-x-1 justify-around">
                        <span className="flex gap-x-1">
                            <img src={mail} alt="Hercodevent@gmail.com"/>
                            <a href="mailto:Hercodevent@gmail.com">Hercodevent@gmail.com</a>
                        </span>
                        <span className="flex gap-x-1">
                            <img src={phone} alt="+234 9055016590"/>
                            <a href="tel:+2349055016590">+234 9055016590</a>
                        </span>
                        <span className="flex gap-x-1">
                            <img src={location} alt="Location: Lagos State, Nigeria"/>
                            Lagos State, Nigeria
                        </span>
                    </figcaption>
                </figure>
                <form className="text-white flex-1">
                    <h1 className="text-[37px] font-bold">Contact Us</h1>
                    <div className="mt-5">
                        <label>Name</label>
                        <input className="mt-2 h-[45px] w-full rounded-md bg-[#22252C] px-4 py-1" placeholder="Enter Your Name"/>
                    </div>
                    <div className="mt-5">
                        <label>Email</label>
                        <input className="mt-2 h-[45px] w-full rounded-md bg-[#22252C] px-4 py-1" placeholder="Enter Your Email Address"/>
                    </div>
                    <div className="mt-5">
                        <label>Message</label>
                        <textarea className="mt-2 !h-[100px] w-full rounded-md bg-[#22252C] px-4 py-2 resize-none overflow-x-hidden" placeholder="Leave a message here"/>
                    </div>
                    <div className="mt-5">
                        <Button>Send message</Button>
                    </div>
                </form>
            </div>
        </section>
    )
}