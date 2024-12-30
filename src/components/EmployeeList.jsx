import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import api from '../api';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await api.get('/employees');
            setEmployees(response.data);
        };
        fetchEmployees();
    }, []);

    return (
        <List>
            {employees.map((employee) => (
                <ListItem key={employee.id}>
                    <ListItemText primary={employee.firstName + ' ' + employee.lastName} />
                </ListItem>
            ))}
        </List>
    );
};

export default EmployeeList;
