import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    MenuItem
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../axiosInstance';
import {useNavigate} from "react-router-dom";

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);


    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editEmployee, setEditEmployee] = useState(null);
    const [ports, setPorts] = useState([]);
    const navigate = useNavigate();

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


    const fetchEmployees = async () => {
        try {
            const response = await axios.get('/api/employees', {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
            });
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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
                headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
            });

            await fetchEmployees();
            alert('Pracownik zarejestrowany poprawnie');
            handleRegisterClose();
        } catch (error) {
            console.error('Błąd rejestracji pracownika:', error.response?.data);
            alert('Rejestracja pracownika nieudana. Sprawdź wprowadzone wartości i spróbuj ponownie.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/employees/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
            });
            setEmployees(employees.filter((employee) => employee.id !== id));
        } catch (error) {
            console.error('Błąd usuwania pracownika:', error.response?.data);
        }
    };

    const handleEditOpen = (employee) => {
        setEditEmployee({
            ...employee, // Przekazanie wszystkich pól pracownika
            portId: employee.port?.id || "", // Pobierz ID portu lub ustaw pustą wartość
        });
        setEditDialogOpen(true);
    };

    const handleEditClose = () => {
        setEditDialogOpen(false);
        setEditEmployee(null);
    };

    const handleEditSave = async () => {
        try {
            await axios.put(`/api/employees/${editEmployee.id}`, editEmployee, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
            });

            await fetchEmployees();
            handleEditClose();
            alert('Edycja pracownika poprawna');
        } catch (error) {
            console.error('Błąd edycji pracownika:', error.response?.data);
            alert(
                `Edycja nieudana. ${
                    error.response?.data?.message || 'Sprawdź wprowadzone wartości i spróbuj ponownie.'
                }`
            );
        }
    };


    const handleEditChange = (field, value) => {
        if (field === 'port') {
            setEditEmployee({
                ...editEmployee,
                port: { ...editEmployee.port, id: value },
            });
        } else {
            setEditEmployee({ ...editEmployee, [field]: value });
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'firstName', headerName: 'Imię', width: 200 },
        { field: 'lastName', headerName: 'Nazwisko', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'position', headerName: 'Rola', width: 150 },
        { field: 'phoneNumber', headerName: 'Telefon', width: 150 },
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
                        Edytuj
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
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
        firstName: employee.firstName,
        lastName:employee.lastName,
        email: employee.email,
        position: employee.position,
        phoneNumber: employee.phoneNumber,
        pesel: employee.pesel,
        port: employee.port?.name || 'Brak danych',
    }));

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                background: 'url(workers.jpg) center center / cover no-repeat', // Background image for employees
                overflowX: 'hidden',
                padding: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Button
                variant="contained"
                onClick={() => navigate(-1)} // Wraca do poprzedniej strony
                sx={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    backgroundColor: 'black',
                    color: 'white',
                    fontWeight: 'bold',
                    '&:hover': {
                        backgroundColor: '#333',
                    },
                }}
            >
                Powrót
            </Button>
            {/* Panel Container */}
            <Box
                sx={{
                    width: '90%',
                    maxWidth: '1600px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '16px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                    padding: '20px',
                    overflow: 'hidden',
                }}
            >
                {/* Toolbar */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px',
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 'bold',
                            color: '#333',
                        }}
                    >
                        Zarządzanie pracownikami
                    </Typography>

                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleRegisterOpen}
                        sx={{
                            fontWeight: 'bold',
                        }}
                    >
                        ZAREJESTRUJ
                    </Button>
                </Box>

                {/* DataGrid */}
                <Box
                    sx={{
                        height: '400px',
                        overflow: 'hidden',
                    }}
                >
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
                        disableRowSelectionOnClick
                        sx={{
                            fontSize: { xs: '0.8rem', sm: '1rem' },
                        }}
                    />
                </Box>
            </Box>

            {/* Edit Employee Dialog */}
            <Dialog open={editDialogOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
                <DialogTitle>Edytuj pracownika</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Imię"
                        value={editEmployee?.firstName || ""}
                        onChange={(e) => handleEditChange("firstName", e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Nazwisko"
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
                        label="Rola"
                        value={editEmployee?.position || ''}
                        onChange={(e) => handleEditChange('position', e.target.value)}
                        margin="normal"
                        fullWidth
                        select
                    >
                        <MenuItem value="Administrator">Administrator</MenuItem>
                        <MenuItem value="Konserwator">Konserwator</MenuItem>
                        <MenuItem value="Magazynier">Magazynier</MenuItem>
                        <MenuItem value="Przeładunkowy">Przeładunkowy</MenuItem>
                    </TextField>
                    <TextField
                        label="PESEL"
                        value={editEmployee?.pesel || ''}
                        onChange={(e) => handleEditChange('pesel', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Port"
                        value={editEmployee?.port?.id || ''} // Assign the port ID
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

            {/* Register Employee Dialog */}
            <Dialog open={registerDialogOpen} onClose={handleRegisterClose} fullWidth maxWidth="sm">
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
                        label="Hasło"
                        type="password"
                        value={newEmployee.password}
                        onChange={(e) => handleRegisterChange('password', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Imię"
                        value={newEmployee.firstName}
                        onChange={(e) => handleRegisterChange('firstName', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Nazwisko"
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
                        label="Narodowość"
                        value={newEmployee.nationality}
                        onChange={(e) => handleRegisterChange('nationality', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Telefon"
                        value={newEmployee.phoneNumber}
                        onChange={(e) => handleRegisterChange('phoneNumber', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Rola"
                        value={newEmployee.position}
                        onChange={(e) => handleRegisterChange('position', e.target.value)}
                        margin="normal"
                        fullWidth
                        select
                    >
                        <MenuItem value="Administrator">Administrator</MenuItem>
                        <MenuItem value="Konserwator">Konserwator</MenuItem>
                        <MenuItem value="Magazynier">Magazynier</MenuItem>
                        <MenuItem value="Przeładunkowy">Przeładunkowy</MenuItem>
                    </TextField>
                    <TextField
                        label="Port"
                        value={newEmployee.port}
                        onChange={(e) => handleRegisterChange('port', e.target.value)}
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
