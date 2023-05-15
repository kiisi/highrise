import { useState } from 'react'
import logo from '../assets/logo.svg'
import Button from '../components/Button'
import dayjs from 'dayjs'
const Navbar = () => {

  const date = dayjs(Date.now()); // Create a dayjs object with the date you want to format
  const formattedDate = date.format('dddd D MMMM YYYY'); // Format the date using the 'dddd D MMMM YYYY' string format

  const [click, setClick] = useState(false)

  const clickHandler = (val) => setClick(val)

  return (
    <>
      <nav>
        <div className="w-full py-3 bg-[#0A0F15]">
          <div className="max-w-xl mx-auto px-4 ss:px-8">
            <div className="text-white">
              <p>{formattedDate}</p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-xl px-4 ss:px-8 py-4 flex justify-between items-center mx-auto">
          <div>
            <img src={logo} alt="HerCode Logo" className="h-[50px]" />
          </div>
          <div className="items-center gap-x-5 hidden ss:flex cursor-pointer">
            <a>Home</a>
            <a>About</a>
            <a>Contact us</a>
            <a className="mr-8">Sign up</a>
            <Button>Login</Button>
          </div>
          <span className="material-icons ss:hidden cursor-pointer" onClick={()=>clickHandler(true)}>menu</span>
        </div>
      </nav>

      <aside className={`fixed max-w-[300px] w-full h-full bg-white navbar-mobile-sidebar ${click ? "active" : ""} top-0 z-[99999]`}>
        <div className="p-4 flex justify-end">
          <span className="material-icons" onClick={()=>clickHandler(false)}>close</span>
        </div>
        <div className="py-3 pr-3 pl-10 flex">
          <a>Home</a>
        </div>
        <div className="py-3 pr-3 pl-10 flex">
          <a>About</a>
        </div>
        <div className="py-3 pr-3 pl-10 flex">
          <a>Contact us</a>
        </div>
        <div className="py-3 pr-3 pl-10 flex">
          <a>Sign up</a>
        </div>
        <div className="py-3 pr-3 pl-10 flex">
          <Button>Login</Button>
        </div>
      </aside>

      {
        click ? <div className="fixed w-full h-full right-0 top-0 bg-[#0000004d] z-[88888]" onClick={()=>clickHandler(false)}></div> : null
      }
      
    </>
  )
}

export default Navbar