import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import api from '../api';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('jwtToken', response.data.token);
            window.location.href = '/employees';
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            maxWidth={400}
            margin="auto"
            padding={3}
        >
            <Typography variant="h5" align="center" gutterBottom>Login</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
            </Button>
        </Box>
    );
};

export default LoginForm;
