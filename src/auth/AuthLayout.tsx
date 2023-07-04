import React, {useState} from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./Login"
import ForgotPassword from "./ForgotPassword"
import Registration from "./Registration"
import AuthWrapper from "./AuthWrapper"



type initialProviderValuesT = {
    user: {name: string, email: string} | null,
    setUser: (name: string, email: string) => void,
    logout: () => void
}
const initialProviderValues = {
    user: null, 
    setUser: () => {},
    logout: () => {}
}
const AuthContext = React.createContext<initialProviderValuesT>(initialProviderValues)
export const useAuth = () => React.useContext(AuthContext)
const getAuth = () => {
    const potentailUser = localStorage.getItem("CURRENT_USER")
    return potentailUser ? JSON.parse(potentailUser) as {name: string, email: string} : null
}

const AuthLayout: React.FC<{children: React.ReactNode}> = ({children} ) => {
    const [user, setUser] = useState<{name: string, email: string} | null>(getAuth())
    const setCurrentUser = (name: string, email: string) => {
        localStorage.setItem("CURRENT_USER", JSON.stringify({name, email}))
        setUser({name, email})
    }
    const logout = () => setUser(null)
    return <AuthContext.Provider value={{user, setUser: setCurrentUser, logout}}>
        <Routes>
            {!user ? <Route element={<AuthWrapper/>}>
            <Route path="auth" element={<Login/>} />
            <Route path="forgot_password" element={<ForgotPassword/>} />
            <Route path="registration" element={<Registration/>} />
            <Route path="*" element={<Navigate to="/auth" />} />
            </Route>
            : children
            } 
        </Routes>
    </AuthContext.Provider>
}

export default AuthLayout