import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountAppBar from './AccountAppBar';
import ButtonAppBar from './ButtonAppBar';
import { fetchUserRole } from './LoginForm';

export default function ConditionalAppBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserStatus = async () => {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                try {
                    const role = await fetchUserRole();
                    if (role) {
                        setUserRole(role);
                        setIsLoggedIn(true);
                    } else {
                        setIsLoggedIn(false);
                        setUserRole(null);
                    }
                } catch (error) {
                    console.error('Błąd podczas pobierania roli użytkownika:', error);
                    localStorage.removeItem('jwtToken'); // Usuń token w razie błędu
                    setIsLoggedIn(false);
                }
            } else {
                setIsLoggedIn(false);
            }
        };

        checkUserStatus();
    }, []);

    if (isLoggedIn && userRole) {
        return <AccountAppBar />;
    } else {
        return <ButtonAppBar />;
    }
}
