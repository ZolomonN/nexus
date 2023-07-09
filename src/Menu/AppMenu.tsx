import { AnnouncementRounded, Drafts } from "@mui/icons-material"
import { Box, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material"
import React from "react"
import { useLocation, useNavigate } from "react-router-dom"


const pages = [
    { title: "Новости", link: "/news", icon: <AnnouncementRounded /> },
    { title: "Адреса", link: "/addresses", icon: <Drafts /> }
]

const AppMenu: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const theme = useTheme()
    return <Box sx={{
        position: { xs: "relative", md: "fixed" },
        width: { xs: 200, lg: 280 },
        height: {xs: "100%", md: "calc(100% - 64px)"},
        overflowY: "auto"
    }}>
        <List
            sx={{ width: '100%' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            {pages.map(page => <ListItemButton
            key={page.link}
                sx={{
                    marginBottom: "4px",
                    borderRadius: "8px",
                    minHeight: "44px"
                }}
                selected={location.pathname.includes(page.link)}
                onClick={() => navigate(page.link)}
            >
                <ListItemIcon>
                    {page.icon}
                </ListItemIcon>
                <ListItemText primary={page.title} primaryTypographyProps={{ fontWeight: 500, color: theme.palette.text.primary }}  />
            </ListItemButton>)}
        </List>
    </Box>
}

export default AppMenu