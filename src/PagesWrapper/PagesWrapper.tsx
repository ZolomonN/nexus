
import { Box, Container, Grid, useTheme } from "@mui/material"
import React from "react"
import { Outlet } from "react-router-dom"
import Header from "../Header/Header"
import AppMenu from "../Menu/AppMenu"

const PagesWrapper: React.FC<{ switchMode: () => void }> = ({ switchMode }) => {
    const mode = useTheme()
    return <Box sx={{backgroundColor: mode.palette.background.default}}>
        <Header switchMode={switchMode} />
        <Grid container spacing={2}>
            <Grid item sx={{
                display: { xs: 'none', md: "block" },
                width: { md: 200, lg: 280 }
            }}>
                <AppMenu />
            </Grid>
            <Grid item xs>
                <Container maxWidth="xl">
                    <Outlet />
                </Container>
            </Grid>
        </Grid>
    </Box>
}

export default PagesWrapper