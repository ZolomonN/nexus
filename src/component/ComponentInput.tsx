import styled from "@emotion/styled"
import { TextField, TextFieldProps } from "@mui/material"
import { useField } from "formik"
import React from "react"

const ComponentInputContainer = styled.div({
    width: "100%",
    ":not(:last-child)": {
        marginBottom: "1rem"
    }
})

const ComponentInput: React.FC<TextFieldProps & {article: string}> = ({article, ...defaultMUIProps}) => {
    const [field, meta] = useField(article)
    const isError = Boolean(meta.touched && meta.error)
    return <ComponentInputContainer>
        <TextField variant="outlined" fullWidth {...defaultMUIProps} {...field} error={isError}/>
    </ComponentInputContainer>
}

export default ComponentInput