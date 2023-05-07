import logo from '../assets/logo.png'
import Button from '../components/Button'
const Navbar = () => {
  return (
    <nav className="bg-[#0A0F15]">
        <div className="w-full max-w-xl px-6 py-4 flex justify-between items-center mx-auto">
            <div>
                <img src={logo} alt="HerCode Logo"/>
            </div>
            <div className="text-white flex items-center gap-x-5">
                <a>Home</a>
                <a>Coaching</a>
                <a>Success Stories</a>
                <a>Hercodekathon</a>
                <a>Sponsor/ win</a>
                <a>Programme</a>
                <a className="mr-10">About us</a>
                <Button>Connect</Button>
            </div>
        </div>
    </nav>
  )
}

export default Navbar