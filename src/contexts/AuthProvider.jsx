import * as authHelper from '@/helpers'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { getUserByToken } from '../apis'
import { logout as apiLogout } from '../apis'

const initAuthContextPropsState = {
    auth: authHelper.getAuth(),
    saveAuth: () => {},
    currentUser: undefined,
    setCurrentUser: () => {},
    logout: () => {},
}

const AuthContext = createContext(initAuthContextPropsState)

const useAuth = () => useContext(AuthContext)

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(authHelper.getAuth())
    const [currentUser, setCurrentUser] = useState()
    
    const saveAuth = (auth) => {
        setAuth(auth)
        if (auth) {
            authHelper.setAuth(auth)
        } else {
            authHelper.removeAuth()
        }
    }

    const logout = () => {
        apiLogout()
        saveAuth(undefined)
        setCurrentUser(undefined)
    }

    return (
        <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout}}>
        {children}
        </AuthContext.Provider>
    )
}

const AuthInit = ({children}) => {
    const {auth, logout, setCurrentUser} = useAuth()
    const didRequest = useRef(false)
    useEffect(() => {
        const requestUser = async (apiToken) => {
            try {
                if (!didRequest.current) {
                    const {user} = await getUserByToken(apiToken)
                    if(user) setCurrentUser(user)
                }
            } catch (error) {
                console.error('AuthInit', error)
                if (!didRequest.current) logout()
            } finally {

            }

            return () => (didRequest.current = true)
        }

        if (auth && auth.apiToken) {
            requestUser(auth.apiToken)
        } else {
            logout()
        }
        
    }, [])

    return (
        <>{children}</>
    )
}

export {
    AuthProvider,
    AuthInit,
    useAuth
}