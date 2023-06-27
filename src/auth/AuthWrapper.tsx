import styled from "@emotion/styled"
import React from "react"
import { Outlet } from "react-router-dom"

const Container = styled.div({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(media/images/auth.jpg)",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
})
const AuthWrapper: React.FC = () => {
    return <Container>
        <Outlet />
    </Container>
}

export default AuthWrapper