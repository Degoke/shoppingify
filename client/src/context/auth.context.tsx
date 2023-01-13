import { useState, createContext, useContext, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { login, LoginDto } from '../api/auth'

interface AuthContextType {
    user: string | null,
    signin: (user: LoginDto, callback: VoidFunction) => void,
    signout: (callback: VoidFunction) => void
}

export const AuthContext = createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<string | null>(localStorage.getItem('user') || null)

    const signin = async (user: LoginDto, callback: VoidFunction) => {
        const response = await login(user)
        setUser(response.data.access_token)
        localStorage.setItem('user', response.data.access_token)
        callback()
    }

    const signout = (callback: VoidFunction) => {
        setUser(null)
        localStorage.removeItem('user')
        callback()
    }

    let value = { user, signin, signout, setUser }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider> 
}

export function useAuth() {
    return useContext(AuthContext)
}

export function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth()
    let location = useLocation()

    console.log(auth.user)

    if(!auth.user) {
        return <Navigate to="/login" state={{ from: location }} replace />     
    }

    return children
}