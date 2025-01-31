import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Automatically redirect after the component is rendered
        const timeout = setTimeout(() => {
            navigate('/');
        }, 1000); // Redirect after 3 seconds (adjust as needed)

        // Cleanup the timeout if the component unmounts before the timeout executes
        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
        <div>
            <h1>Brak uprawnień</h1>
            <p>Nie masz wystarczających uprawnień, aby zobaczyć tę stronę.</p>
            <p>Przekierowanie na stronę główną...</p>
        </div>
    );
};

export default AccessDenied;
