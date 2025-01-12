import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import axios from '../axiosInstance';

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('/api/employees', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
                });
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error.response?.data);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    // Definiowanie kolumn
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'position', headerName: 'Position', width: 150 },
        { field: 'phoneNumber', headerName: 'Phone', width: 150 },
    ];

    // Modyfikowanie danych dla DataGridPro
    const rows = employees.map((employee) => ({
        id: employee.id,
        name: `${employee.firstName} ${employee.lastName}`,
        email: employee.email,
        position: employee.position,
        phoneNumber: employee.phoneNumber,
    }));

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}

export default Employees;
