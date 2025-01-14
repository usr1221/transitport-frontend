import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Brak uprawnień</h1>
            <p>Nie masz wystarczających uprawnień, aby zobaczyć tę stronę.</p>
            <button onClick={() => navigate(-1)}>Powrót</button>
        </div>
    );
};

export default AccessDenied;