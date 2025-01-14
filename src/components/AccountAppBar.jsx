import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom'
import { fetchUserRole } from "./LoginForm";

export default function AccountAppBar() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('jwtToken'); // Usuń token
        navigate('/login');                 // Przekieruj na login
    };
    const accountRedirect = async () => {
        try {
            const userRole = await fetchUserRole(); // Pobierz rolę użytkownika

            if (!userRole) {
                throw new Error('Nie udało się pobrać roli użytkownika');
            }

            // Przekierowanie w zależności od roli
            switch (userRole) {
                case 'ROLE_ADMIN':
                    navigate('/admin');
                    break;
                case 'ROLE_MAINTAINER':
                    navigate('/maintainer');
                    break;
                case 'ROLE_HANDLER':
                    navigate('/handler');
                    break;
                default:
                    navigate('/employees'); // Domyślna strona
                    break;
            }
        } catch (error) {
            console.error('Błąd podczas przekierowania:', error);
            alert('Nie udało się odczytać roli użytkownika.');
            navigate('/login'); // Przekierowanie na stronę logowania w przypadku błędu
        }
    };
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
                        onClick={() => accountRedirect()}
                        sx={{ marginLeft: 'auto' }}
                    > Panel Sterowania
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => logout()}
                        sx={{ marginLeft: 'auto' }}
                    > Wyloguj
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}