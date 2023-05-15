import logo from '../assets/logo.svg'
import Button from '../components/Button'
import dayjs from 'dayjs'
const Navbar = () => {

  const date = dayjs(Date.now()); // Create a dayjs object with the date you want to format
  const formattedDate = date.format('dddd D MMMM YYYY'); // Format the date using the 'dddd D MMMM YYYY' string format
  console.log(formattedDate);

  return (
    <nav>
      <div className="w-full py-2 bg-[#0A0F15]">
        <div className="max-w-xl mx-auto px-4 ss:px-8">
          <div className="text-white">
            <p>{formattedDate}</p>
          </div>
        </div>
      </div>
        <div className="w-full max-w-xl px-4 ss:px-8 py-4 flex justify-between items-center mx-auto">
            <div>
                <img src={logo} alt="HerCode Logo" className="h-[50px]"/>
            </div>
            <div className="items-center gap-x-5 hidden ss:flex">
                <a>Home</a>
                <a>About</a>
                <a>Contact us</a>
                <a className="mr-8">Sign up</a>
                <Button>Login</Button>
            </div>
            <span className="material-icons ss:hidden">menu</span>
        </div>
    </nav>
  )
}

export default Navbar