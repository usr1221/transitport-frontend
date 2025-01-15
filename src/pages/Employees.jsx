import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    MenuItem,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../axiosInstance';

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editEmployee, setEditEmployee] = useState(null);
    const [ports, setPorts] = useState([]);

    const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        pesel: '',
        nationality: '',
        phoneNumber: '',
        position: '',
        port: '',
    });

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

    useEffect(() => {
        const fetchPorts = async () => {
            try {
                const response = await axios.get('/api/ports', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
                });
                setPorts(response.data);
            } catch (error) {
                console.error('Error fetching ports:', error.response?.data);
            }
        };

        fetchPorts();
    }, []);

    const handleRegisterOpen = () => {
        setRegisterDialogOpen(true);
    };

    const handleRegisterClose = () => {
        setRegisterDialogOpen(false);
        setNewEmployee({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            pesel: '',
            nationality: '',
            phoneNumber: '',
            position: '',
            port: '',
        });
    };

    const handleRegisterChange = (field, value) => {
        setNewEmployee({ ...newEmployee, [field]: value });
    };

    const handleRegisterSubmit = async () => {
        try {
            await axios.post('/api/auth/register', newEmployee, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
            });
            alert('Employee registered successfully!');
            handleRegisterClose();
        } catch (error) {
            console.error('Error registering employee:', error.response?.data);
            alert('Failed to register employee. Please check the inputs.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/employees/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
            });
            setEmployees(employees.filter((employee) => employee.id !== id));
        } catch (error) {
            console.error('Error deleting employee:', error.response?.data);
        }
    };

    const handleEditOpen = (employee) => {
        setEditEmployee(employee);
        setEditDialogOpen(true);
    };

    const handleEditClose = () => {
        setEditDialogOpen(false);
        setEditEmployee(null);
    };

    const handleEditSave = async () => {
        try {
            await axios.put(`/api/employees/${editEmployee.id}`, editEmployee, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
            });

            setEmployees((prevEmployees) =>
                prevEmployees.map((emp) => (emp.id === editEmployee.id ? editEmployee : emp))
            );
            handleEditClose();
        } catch (error) {
            console.error('Error updating employee:', error.response?.data);
        }
    };

    const handleEditChange = (field, value) => {
        if (field === 'port') {
            setEditEmployee({
                ...editEmployee,
                port: { ...editEmployee.port, id: value }, // Aktualizacja id portu
            });
        } else {
            setEditEmployee({ ...editEmployee, [field]: value });
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'position', headerName: 'Position', width: 150 },
        { field: 'phoneNumber', headerName: 'Phone', width: 150 },
        { field: 'pesel', headerName: 'PESEL', width: 150 },
        { field: 'port', headerName: 'Port', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleEditOpen(params.row)}
                        sx={{ marginRight: 1 }}
                    >
                        Modyfikuj
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Usuń
                    </Button>
                </Box>
            ),
        },
    ];

    const rows = employees.map((employee) => ({
        id: employee.id,
        name: `${employee.firstName} ${employee.lastName}`,
        email: employee.email,
        position: employee.position,
        phoneNumber: employee.phoneNumber,
        pesel: employee.pesel,
        port: employee.port?.id || 'Brak danych',
    }));

    return (
        <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleRegisterOpen}
                sx={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    zIndex: 1,
                }}
            >
                ZAREJESTRUJ
            </Button>

            <Box sx={{ height: 400, width: '100%', marginTop: '60px' }}>
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

            <Dialog open={editDialogOpen} onClose={handleEditClose}>
                <DialogTitle>Edytuj pracownika</DialogTitle>
                <DialogContent>
                    <TextField
                        label="First Name"
                        value={editEmployee?.firstName || ''}
                        onChange={(e) => handleEditChange('firstName', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Last Name"
                        value={editEmployee?.lastName || ''}
                        onChange={(e) => handleEditChange('lastName', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        value={editEmployee?.email || ''}
                        onChange={(e) => handleEditChange('email', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Position"
                        value={editEmployee?.position || ''}
                        onChange={(e) => handleEditChange('position', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="PESEL"
                        value={editEmployee?.pesel || ''}
                        onChange={(e) => handleEditChange('pesel', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Port"
                        value={editEmployee?.port?.id || ''} // Obsługuje ID portu
                        onChange={(e) => handleEditChange('port', e.target.value)}
                        margin="normal"
                        fullWidth
                        select
                    >
                        {ports.map((port) => (
                            <MenuItem key={port.id} value={port.id}>
                                {port.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} color="secondary">
                        Anuluj
                    </Button>
                    <Button onClick={handleEditSave} color="primary">
                        Zapisz
                    </Button>
                </DialogActions>
            </Dialog>


            {/* Dialog rejestracji */}
            <Dialog open={registerDialogOpen} onClose={handleRegisterClose}>
                <DialogTitle>Zarejestruj nowego pracownika</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Email"
                        value={newEmployee.email}
                        onChange={(e) => handleRegisterChange('email', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={newEmployee.password}
                        onChange={(e) => handleRegisterChange('password', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="First Name"
                        value={newEmployee.firstName}
                        onChange={(e) => handleRegisterChange('firstName', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Last Name"
                        value={newEmployee.lastName}
                        onChange={(e) => handleRegisterChange('lastName', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="PESEL"
                        value={newEmployee.pesel}
                        onChange={(e) => handleRegisterChange('pesel', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Nationality"
                        value={newEmployee.nationality}
                        onChange={(e) => handleRegisterChange('nationality', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Phone Number"
                        value={newEmployee.phoneNumber}
                        onChange={(e) => handleRegisterChange('phoneNumber', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Position"
                        value={newEmployee.position}
                        onChange={(e) => handleRegisterChange('position', e.target.value)}
                        margin="normal"
                        fullWidth
                        select
                    >
                        <MenuItem value="Administrator">Administrator</MenuItem>
                        <MenuItem value="Konserwator">Konserwator</MenuItem>
                        <MenuItem value="Magazynier">Magazynier</MenuItem>
                        <MenuItem value="Przeladunkowy">Przeładunkowy</MenuItem>
                    </TextField>
                    <TextField
                        label="Port Number"
                        value={newEmployee.port}
                        onChange={(e) => handleRegisterChange('port', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRegisterClose} color="secondary">
                        Anuluj
                    </Button>
                    <Button onClick={handleRegisterSubmit} color="primary">
                        Zarejestruj
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Employees;
