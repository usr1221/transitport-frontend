import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom'

export default function ButtonAppBar() {
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: 'black' }}>
                <Toolbar>
                    <Button
                        color="inherit"
                        onClick={() => navigate('/')}
                    > Port
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => navigate('/contact')}
                    > Kontakt
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => navigate('/login')}
                        sx={{ marginLeft: 'auto' }}
                        > Login
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}