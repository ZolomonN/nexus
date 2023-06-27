import React from "react"
import { AuthContainer, AuthContainerWrapper, AuthDescription, AuthTitle } from "./Login"
import styled from "@emotion/styled"
import ComponentInput from "../component/ComponentInput"
import ComponentButton, { ComponentButtonsContainer } from "../component/ComponentButton"
import { useNavigate } from "react-router-dom"
import { Form, Formik } from "formik"

const RegistrationForm = styled.div({
    width: "100%"
})
const Registration: React.FC = () => {
    const navigate = useNavigate()
    const handleReturn = () => navigate("/auth")
    return <AuthContainerWrapper>
        <AuthContainer>
            <AuthTitle>Регистрация</AuthTitle>
            <AuthDescription>Введите необходимые для регистрации данные</AuthDescription>
            <RegistrationForm>
                <Formik initialValues={{ name: "", email: "", password: "" }} onSubmit={values => console.log(values)}>
                    {props => <Form>
                        <ComponentInput article="name" label="Имя" />
                        <ComponentInput article="email" label="Email" required />
                        <ComponentInput article="password" label="Пароль" type="password" required />
                        <ComponentButtonsContainer>
                            <ComponentButton>Подтвердить</ComponentButton>
                            <ComponentButton color="secondary" onClick={handleReturn}>Отмена</ComponentButton>
                        </ComponentButtonsContainer>
                    </Form>}
                </Formik>


            </RegistrationForm>
        </AuthContainer>
    </AuthContainerWrapper>
}


export default Registration