/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/userContext'
import authService from '../services/auth'

const Auth = ({ children }) => {

    const navigate = useNavigate()
    let location = useLocation().pathname;
    const [splash, setSplash] = useState(true)
    const { dispatch } = useUserContext()

    useEffect(() => {
        (async () => {
            try {
                const res = await authService.verifyUser()
                console.log(res)

                if (res.data.success) {
                    dispatch({ type: "USER", payload: res.data.data })
                    setSplash(false)
                    navigate('/dashboard')
                } else {
                    setSplash(false)
                    if (['/login', '/signup', '/verification'].includes(location)) {
                        navigate(location)
                    } else {
                        navigate('/')
                    }
                }
            } catch (err) {
                setSplash(false)
                navigate('/')
                console.log("Error", err)
            }
        })()
    }, [])

    if (splash) {
        return (
            <main className="h-[100vh] w-full grid place-items-center">
                <img src="/logo.svg" alt="HerCode Logo" className="h-[50px]" />
            </main>
        )
    }

    return <>{children}</>;
}

export default Auth