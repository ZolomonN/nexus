import React from "react"
import { AuthContainer, AuthContainerWrapper, AuthDescription, AuthTitle } from "./Login"
import styled from "@emotion/styled"
import ComponentInput from "../component/ComponentInput"
import ComponentButton, { ComponentButtonsContainer } from "../component/ComponentButton"
import { useNavigate } from "react-router-dom"
import { Form, Formik } from "formik"


const ForgotPasswordForm = styled.div({
    width: "100%"
})



const ForgotPassword: React.FC = () => {
    const navigate = useNavigate()
    const handleReturn = () => navigate("/auth")
    return <AuthContainerWrapper>
        <AuthContainer>
        <AuthTitle>Забыли пароль?</AuthTitle>
        <AuthDescription>Введите свой email для сброса пароля</AuthDescription>
        <ForgotPasswordForm>
        <Formik initialValues={{ email: ""}} onSubmit={values => console.log(values)}>
                    {props => <Form>
                        <ComponentInput article="email" label="Email" required />
                        <ComponentButtonsContainer>
                <ComponentButton>Подтвердить</ComponentButton>
                <ComponentButton color="secondary" onClick={handleReturn}>Отмена</ComponentButton>
            </ComponentButtonsContainer>
                    </Form>}
                </Formik>
        </ForgotPasswordForm>
    </AuthContainer>
        </AuthContainerWrapper>
}

export default ForgotPassword