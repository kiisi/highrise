import { useState, useRef, useEffect } from 'react'
import logo from '../assets/logo.svg'
import Button from '../components/Button'
import { Link } from 'react-router-dom'


const Navbar = () => {

  const [click, setClick] = useState(false)

  const clickHandler = (val) => setClick(val)

  const navRef = useRef()

  useEffect(()=>{
    const sticky = navRef.current.offsetTop

    window.onscroll = () =>{
      if (window.scrollY >= sticky) {
        navRef.current.classList.add("sticky-navbar")
      } else {
        navRef.current.classList.remove("sticky-navbar");
      }
    }
  },[])

  return (
    <>
      <nav ref={navRef}>
        <div className="w-full max-w-xl px-4 ss:px-8 py-4 flex justify-between items-center mx-auto">
          <div>
            <img src={logo} alt="HerCode Logo" className="h-[50px]" />
          </div>
          <div className="items-center gap-x-5 hidden ss:flex cursor-pointer">
            <Link to='/'>Home</Link>
            <a>About</a>
            <a>Contact us</a>
            <Link to="/signup" className="mr-8">Sign up</Link>
            <Link to="/login"><Button>Login</Button></Link>
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
          <Link>Sign up</Link>
        </div>
        <div className="py-3 pr-3 pl-10 flex">
          <Link to="/login"><Button>Login</Button></Link>
        </div>
      </aside>

      {
        click ? <div className="fixed w-full h-full right-0 top-0 bg-[#0000004d] z-[88888]" onClick={()=>clickHandler(false)}></div> : null
      }
      
    </>
  )
}

export default Navbar