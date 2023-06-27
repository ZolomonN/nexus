import styled from "@emotion/styled"
import { Button, ButtonProps } from "@mui/material"
import React from "react"

export const ComponentButtonsContainer = styled.div({
    width: "100%",
    "& > *:not(:last-child)": {
        marginBottom: "0.5rem"
    }
})

const ComponentButton: React.FC<ButtonProps> = ({children, ...otherMUIProps}) => {
    return <Button variant="contained" fullWidth {...otherMUIProps}>{children}</Button>
}

export default ComponentButton