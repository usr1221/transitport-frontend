import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api';

const PrivateRoute = ({ children, allowedRoles }) => {
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await api.get('/auth/role', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUserRole(response.data); // Ustaw rolę użytkownika
            } catch (error) {
                console.error('Error fetching role:', error);
                setUserRole(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRole();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Wyświetlaj komunikat w trakcie ładowania
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/access-denied" />;
    }

    return children;
};

export default PrivateRoute;
