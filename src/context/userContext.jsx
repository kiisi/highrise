/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from 'react'

const UserContext = createContext(null)

const initState = null

const reducerFunc = (state, action) =>{

    switch(action.type){
        case "USER":{
            return {
                ...state,
                user: action.payload
            }
        }
        case "SERVICE":{
            return {
                ...state,
                service: action.payload
            }
        }
        default:{
            throw Error("Unknown Action")
        }
    }
}
export const UserProvider = ({ children }) =>{

    const [state, dispatch] = useReducer(reducerFunc, initState)
    console.log(state)

    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext) 