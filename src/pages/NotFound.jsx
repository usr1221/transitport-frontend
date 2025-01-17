import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Automatically redirect after the component is rendered
        const timeout = setTimeout(() => {
            navigate('/');
        }, 1000); // Redirect after 5 seconds (adjust as needed)

        // Cleanup the timeout if the component unmounts before the timeout executes
        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
        <div>
            <h1>404 - Strona nie znaleziona</h1>
            <p>Przepraszamy, ale strona, której szukasz, nie istnieje.</p>
            <p>Za chwilę zostaniesz przekierowany na stronę główną...</p>
        </div>
    );
};

export default NotFound;
