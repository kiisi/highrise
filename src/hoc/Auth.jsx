/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/userContext'
import Spinner from '../components/Spinner'
import { base_endpoint } from '../utils/endpoints'

const Auth = ({ children }) =>{

    const [auth, setAuth] = useState(null)
    const navigate = useNavigate()
    const { dispatch } = useUserContext()

    const settings = {
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        }
    };

    useEffect(()=>{
        (async ()=>{
            try{
                const res = await fetch(`${base_endpoint}/auth/verify-user`, settings)
                const data = await res.json()
                if(data.success){
                    dispatch({type:"USER", payload: data.data})
                    setAuth(true)
                }else{
                    navigate('/login')
                }
            }
            catch(err){
                navigate('/login')
            }
        })()
    }, [])

    return <>{ auth ? children : <Spinner/> }</>;
}

export default Auth