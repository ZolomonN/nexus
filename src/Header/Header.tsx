import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Badge, Drawer, useTheme } from '@mui/material';
import { DarkMode, LightMode, MailOutline, Notifications } from '@mui/icons-material';
import AppMenu from '../Menu/AppMenu';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Logo: React.FC = () => {
  return <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
    <Typography
      variant="h6"
      noWrap
      component="a"
      href="/"
      sx={{
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      LOGO
    </Typography>
  </Box>
}

const MobileMenu: React.FC = () => {
  const [showDrawler, setShowDrawler] = useState(false)
  return <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
    <IconButton
      size="large"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={() => setShowDrawler(true)}
      color="inherit"
    >
      <MenuIcon />
    </IconButton>
    <Drawer
      anchor="left"
      open={showDrawler}
      onClose={() => setShowDrawler(false)}
    >
      <AppMenu />
    </Drawer>
  </Box>
}

const ThemeModeSwitcher: React.FC<{ switchMode: () => void }> = ({switchMode}) => {
  const mode = useTheme()

  return <IconButton
      size="large"
      aria-label="show app settings"
      color="inherit"
      onClick={switchMode}
    >
      <Badge color="error">
        {mode.palette.mode === "light" ? <LightMode /> : <DarkMode />}
      </Badge>
    </IconButton>
  
}

const Header: React.FC<{ switchMode: () => void }> = ({switchMode}) => {

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };



  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return <AppBar position="sticky" sx={{ padding: "0 20px" }}>
    <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
      <MobileMenu />
      <Logo />
      <Box sx={{ flexGrow: 0 }}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailOutline />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <ThemeModeSwitcher switchMode={switchMode} />
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu}>
            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Toolbar>
  </AppBar>

}
export default Header;
