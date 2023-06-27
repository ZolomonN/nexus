import React from "react"
import styled from '@emotion/styled'
import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./Login"
import ForgotPassword from "./ForgotPassword"
import Registration from "./Registration"



const AuthWrapper = styled.div({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(media/images/crm.jpg)",
    height: "100%",
})





const AuthPage: React.FC = () => {
    return <AuthWrapper>
        <Routes>
            <Route path="auth" element={<Login/>} />
            <Route path="forgot_password" element={<ForgotPassword/>} />
            <Route path="registration" element={<Registration/>} />
            <Route path="*" element={<Navigate to={"/auth"} />} />
        </Routes>
    </AuthWrapper>
}

export default AuthPage