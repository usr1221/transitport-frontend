import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import axios from '../axiosInstance';

function Employees() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('/api/employees', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
                });
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error.response?.data);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Employees List
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Position</TableCell>
                        <TableCell>Phone</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                            <TableCell>{employee.email}</TableCell>
                            <TableCell>{employee.position}</TableCell>
                            <TableCell>{employee.phoneNumber}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}

export default Employees;
