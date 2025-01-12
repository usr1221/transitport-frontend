import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                Welcome to Transit Port Management
            </Typography>
            <Typography variant="body1" gutterBottom>
                Manage employees, ports, and logistics with ease.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/login')}
                style={{ marginRight: '10px' }}
            >
                Login
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate('/employees')}
            >
                View Employees
            </Button>
        </Container>
    );
}

export default Login;
