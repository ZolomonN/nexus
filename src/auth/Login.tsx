import styled from "@emotion/styled"
import React, {useCallback} from "react"
import ComponentInput from "../component/ComponentInput"

import ComponentButton from "../component/ComponentButton"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { toast } from 'react-toastify';
import { useAuth } from "./AuthLayout"
import { Link } from "react-router-dom"

const currentUserLogin = {
    email: "test@mail.ru",
    password: '1234'
}

export const AuthContainerWrapper = styled.div({
    position: "relative",
    width: "500px",
    padding: "0.25rem",
    borderBottomLeftRadius: "4rem",
    borderTopRightRadius: "4rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
    "&:before": {
        content: '""',
        position: "absolute",
        top: "-50%",
        left: "-50%",
        width: "100%",
        height: "100%",
        background: "linear-gradient(60deg, transparent, #45f3ff, #45f3ff)",
        animation: "animate 3s linear infinite",
        transformOrigin: "bottom right",
    },
    "&:after": {
        content: '""',
        position: "absolute",
        bottom: "-50%",
        right: "-50%",
        width: "100%",
        height: "100%",
        background: "linear-gradient(60deg, transparent, #d9138a, #d9138a)",
        animation: "animate 3s linear infinite",
        transformOrigin: "top left",
    }
})
export const AuthContainer = styled.div({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    borderBottomLeftRadius: "4rem",
    borderTopRightRadius: "4rem",
    backgroundColor: "#fff",
    padding: "3rem",
    zIndex: 1
})
export const AuthTitle = styled.h1({
    fontSize: "2.5rem",
    margin: "0 0 1.5rem"
})
export const AuthDescription = styled.div({
    fontSize: "1.05rem",
    marginBottom: "2rem",
    textAlign: "center"
})
const LoginForm = styled.div({
    width: "100%"
})
const ForgotPasswordLinkContainer = styled.div({
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    margin: "0.75rem 0 2rem"
})
export const AuthLink = styled(Link)({
    textDecoration: "none"
})
const RegistrationLinkContainer = styled.div({
    width: "100%",
    textAlign: "center",
    marginTop: "0.75rem"
})
const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(4).required()
})

const Login: React.FC = () => {
    const {setUser} = useAuth()
    const handleSubmit = useCallback((values: {email: string, password: string}) => {
        const {email, password} = currentUserLogin
        if (email === values.email && password === values.password) {
            toast("Вы успешно авторизованы")
            setUser("Админ", email)
        } else {
            toast.error("Неправильные данные")
        }
    }, [])
    return <AuthContainerWrapper>
        <AuthContainer>
            <AuthTitle>
                Авторизация
            </AuthTitle>
            <AuthDescription>
                Войдите под своими учетными данными, которые вы ввели при регистрации
            </AuthDescription>
            <LoginForm>
                <Formik initialValues={{ email: "", password: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {props => <Form>
                        <ComponentInput label="Email" article="email" required />
                        <ComponentInput label="Пароль" article="password" type="password" required />
                        <ForgotPasswordLinkContainer>
                            <AuthLink to="/forgot_password" >Забыли пароль?</AuthLink>
                        </ForgotPasswordLinkContainer>
                        <ComponentButton type="submit">Авторизация</ComponentButton>
                    </Form>}
                </Formik>

            </LoginForm>


            <RegistrationLinkContainer>
                У вас еще нет аккаунта? <AuthLink to="/registration">Регистрация</AuthLink>
            </RegistrationLinkContainer>
        </AuthContainer>
    </AuthContainerWrapper>
}

export default Login