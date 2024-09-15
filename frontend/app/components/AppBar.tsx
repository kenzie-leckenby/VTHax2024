import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeContext } from '../src/ThemeContext'; // Adjust the path as needed
import { Link, useNavigate } from '@remix-run/react'; // Import useNavigate

const settings = ['Account', 'Login'];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { darkMode, toggleTheme } = useThemeContext();
  const navigate = useNavigate(); // Initialize navigate

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (setting: string) => {
    if (setting === 'Login') {
      navigate('/signIn'); // Redirect to /signIn
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static" sx={{
      backgroundColor: 'background.paper',
      color: 'text.primary'
      }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <svg width="33" height="41" viewBox="0 0 33 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 17L15 10L29 17V32L15 40L1 32V17Z" fill="#D9D9D9"/>
            <path d="M15 10L1 17M15 10L29 17M15 10L25 19M15 10L5 19M1 17V32M1 17L5 19M1 32L15 40M1 32L15 35M1 32L5 19M15 40L29 32M15 40V35M29 32V17M29 32L15 35M29 32L25 19M29 17L25 19M15 35L5 19M15 35L25 19M5 19H25" stroke="black"/>
            <path d="M30 11C27.6667 11 22.6 9.8 21 5L23 11H30Z" fill="#D9D9D9"/>
            <path d="M23 14V11M23 11H30C27.6667 11 22.6 9.8 21 5L23 11ZM24.5 9L27 6M26 3C29.2 3 30 5.66667 30 7M26 1C30.8 1 32 5 32 7" stroke="black"/>
            </svg>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              IntelliQuest
            </Typography>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              IntelliQuest
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={toggleTheme} sx={{ p: 0, mr: 2 }}>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" />
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
                <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;



