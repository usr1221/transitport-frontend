import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import ButtonAppBar from '../components/ButtonAppBar';
import api from '../api';

export const fetchUserRole = async () => {
    try {
        const token = localStorage.getItem('jwtToken');
        const response = await api.get('/auth/role', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // Rola użytkownika
    } catch (err) {
        console.error('Failed to fetch role', err);
        return null;
    }
};

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('jwtToken', response.data.token);

            const role = await fetchUserRole(); // Pobierz rolę z backendu
            if (role === 'ROLE_ADMIN') {
                window.location.href = '/';
            } else if (role === 'ROLE_MAINTAINER') {
                window.location.href = '/';
            } else if (role === 'ROLE_WAREHOUSE') {
                window.location.href = '/';
            } else if (role === 'ROLE_HANDLER') {
                window.location.href = '/';
            } else {
                window.location.href = '/';
            }
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <Box
            sx={{
                height: '100vh',
                backgroundImage: 'url("login.jpg")', // Obraz tła
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Pasek nawigacyjny */}
            <ButtonAppBar />

            {/* Czarny box z formularzem */}
            <Box
                sx={{
                    marginTop: '64px', // Odstęp równy wysokości AppBar
                    marginX: 'auto',
                    padding: '20px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Czarne przezroczyste tło
                    borderRadius: '8px',
                    maxWidth: '400px',
                    color: 'white',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
                    textAlign: 'center', // Wyśrodkowanie tekstu
                }}
            >
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>
                {error && (
                    <Typography color="error" sx={{ marginBottom: '10px' }}>
                        {error}
                    </Typography>
                )}
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ style: { color: 'white' } }} // Kolor etykiet
                    sx={{
                        '& .MuiInputBase-input': { color: 'white' }, // Kolor tekstu
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'white' }, // Obramowanie
                            '&:hover fieldset': { borderColor: 'gray' }, // Hover
                            '&.Mui-focused fieldset': { borderColor: 'white' }, // Focus
                        },
                    }}
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{ style: { color: 'white' } }}
                    sx={{
                        '& .MuiInputBase-input': { color: 'white' },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'white' },
                            '&:hover fieldset': { borderColor: 'gray' },
                            '&.Mui-focused fieldset': { borderColor: 'white' },
                        },
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    sx={{
                        marginTop: '20px',
                        backgroundColor: 'white', // Przycisk biały
                        color: 'black', // Czarny tekst
                        '&:hover': {
                            backgroundColor: 'gray',
                            color: 'white',
                        },
                    }}
                >
                    Login
                </Button>
            </Box>
        </Box>
    );
};

export default LoginForm;
