import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-provider";

const Header = ({ toggleDrawer }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {isAuthenticated && (
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Campus Pulse
                </Typography>
                {isAuthenticated && (<div>
                    <IconButton onClick={handleMenu} color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} disableAutoFocusItem>
                        <MenuItem onClick={() => {
                            navigate('/account');
                            handleClose();
                        }}>Account</MenuItem>
                        {user?.role === 'Admin' && <MenuItem onClick={() => {
                            navigate('/users');
                            handleClose();
                        }}>Users</MenuItem>}
                    </Menu>
                </div>)}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
