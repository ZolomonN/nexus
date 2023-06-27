
import { Box, Collapse, Container, Grid, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Stack, styled, useTheme } from "@mui/material"
import React, { useCallback, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import { Send as SendIcon, Inbox as InboxIcon, Drafts as DraftsIcon, ExpandLess, ExpandMore, StarBorder, AnnouncementRounded } from "@mui/icons-material"
import ComponentCard from "./ComponentCard"
import News from "./News"
import Header from "../Header/Header"
import AppMenu from "../Menu/AppMenu"

const Content = styled(Container)({
    display: "flex",
    height: "300vh"
})

const PagesWrapper: React.FC<{ switchMode: () => void }> = ({ switchMode }) => {
    const [minimizeMenu, setMinimizeMenu] = useState(false)
    const handleMinimizeButtonClick = useCallback(() => setMinimizeMenu(prev => !prev), [])
    const mode = useTheme()
    const navigate = useNavigate()
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



    {/* <Box sx={{
        position: "relative",
        transition: "background-color 0.3s",
        color: mode.palette.text.primary,
        backgroundColor: mode.palette.background.default,
        padding: {xs: `70px 0 0 0`, md: `70px 0 0 ${minimizeMenu ? "80px" : "280px"}`}
    }}>
        <Header minimizeMenu={minimizeMenu} switchMode={switchMode} />
        <Menu minimizeMenu={minimizeMenu} handleMinimizeButtonClick={handleMinimizeButtonClick}/>
        <Content maxWidth="xl">
            <Outlet />
        </Content>

    </Box> */}
}

export default PagesWrapper