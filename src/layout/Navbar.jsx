import { useState, useRef, useEffect } from 'react'
import logo from '../assets/logo.svg'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import { useUserContext } from '../context/userContext'


const Navbar = () => {

  const { state } = useUserContext()

  const [click, setClick] = useState(false)

  const toggleHandler = () => setClick(prev => !prev)

  const navRef = useRef()

  useEffect(() => {
    const sticky = navRef.current.offsetTop

    window.onscroll = () => {
      if (window.scrollY >= sticky) {
        navRef.current?.classList.add("sticky-navbar")
      } else {
        navRef.current?.classList.remove("sticky-navbar");
      }
    }
  }, [])



  return (
    <>
      <nav ref={navRef}>
        <div className="w-full max-w-xl px-4 ss:px-8 py-4 flex justify-between items-center mx-auto">
          <div>
            <img src={logo} alt="Logo" className="h-[50px]" />
          </div>
          <div className="items-center gap-x-5 hidden ss:flex cursor-pointer">
            <a href='https://highrisenews.com/'>Home</a>
            <a href='/#about'>About</a>
            <a href="/#contact-us">Contact us</a>
            {
              state?.user ?
                <Link to="/dashboard">
                  <Button className="ml-8">Dashboard</Button>
                </Link>
                :
                <>
                  <Link to="/signup" className="mr-8">Sign up</Link>
                  <Link to="/login">
                    <Button>Login</Button>
                  </Link>
                </>
            }
          </div>
          <span className="material-icons ss:hidden cursor-pointer" onClick={toggleHandler}>menu</span>
        </div>
      </nav>

      <aside className={`fixed max-w-[300px] flex flex-col gap-y-6 w-full h-full bg-white navbar-mobile-sidebar ${click ? "active" : ""} top-0 z-[99999]`}>
        <div className="p-4 flex justify-end">
          <span className="material-icons" onClick={toggleHandler}>close</span>
        </div>
        <div className="pr-3 pl-10 flex">
          <Link to='/' onClick={toggleHandler}>Home</Link>
        </div>
        <div className="pr-3 pl-10 flex">
          <a href='/#about' onClick={toggleHandler}>About</a>
        </div>
        <div className="pr-3 pl-10 flex">
          <a href="/#contact-us" onClick={toggleHandler}>Contact us</a>
        </div>
        {
          state?.user ?
            <Link to="/dashboard"><Button className="ml-8">Dashboard</Button></Link>
            :
            <>
              <div className="pr-3 pl-10 flex">
                <Link to='/signup' onClick={toggleHandler}>Sign up</Link>
              </div>
              <div className="pr-3 pl-10 flex">
                <Link to="/login" onClick={toggleHandler}><Button>Login</Button></Link>
              </div>
            </>
        }
      </aside>
      {
        click ? <div className="fixed w-full h-full right-0 top-0 bg-[#0000004d] z-[88888]" onClick={toggleHandler}></div> : null
      }
    </>
  )
}

export default Navbar