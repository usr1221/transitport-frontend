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

function Warehouses() {
    const [warehouses, setWarehouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editWarehouse, setEditWarehouse] = useState(null);
    const [terminals, setTerminals] = useState([]);
    const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
    const [newWarehouse, setNewWarehouse] = useState({
        capacity: '',
        occupancy: '',
        terminalId: '',
    });

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await axios.get('/api/warehouses', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
                });
                setWarehouses(response.data);
            } catch (error) {
                console.error('Error fetching warehouses:', error.response?.data);
            } finally {
                setLoading(false);
            }
        };

        fetchWarehouses();
    }, []);

    useEffect(() => {
        const fetchTerminals = async () => {
            try {
                const response = await axios.get('/api/terminals', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
                });
                setTerminals(response.data);
            } catch (error) {
                console.error('Error fetching terminals:', error.response?.data);
            }
        };

        fetchTerminals();
    }, []);

    const handleRegisterOpen = () => {
        setRegisterDialogOpen(true);
    };

    const handleRegisterClose = () => {
        setRegisterDialogOpen(false);
        setNewWarehouse({
            capacity: '',
            occupancy: '',
            terminalId: '',
        });
    };

    const handleRegisterChange = (field, value) => {
        setNewWarehouse({ ...newWarehouse, [field]: value });
    };

    const handleRegisterSubmit = async () => {
        try {
            await axios.post('/api/warehouses', newWarehouse, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
            });
            alert('Warehouses registered successfully!');
            handleRegisterClose();
        } catch (error) {
            console.error('Error registering warehouse:', error.response?.data);
            alert('Failed to register warehouse. Please check the inputs.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/warehouses/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
            });
            setWarehouses(warehouses.filter((warehouse) => warehouse.id !== id));
        } catch (error) {
            console.error('Error deleting warehouse:', error.response?.data);
        }
    };

    const handleEditOpen = (warehouse) => {
        setEditWarehouse(warehouse);
        setEditDialogOpen(true);
    };

    const handleEditClose = () => {
        setEditDialogOpen(false);
        setEditWarehouse(null);
    };

    const handleEditSave = async () => {
        const warehouseToSave = {
            ...editWarehouse,
            terminalId: editWarehouse.terminal, // Zmieniamy terminal na terminalId
        };
        delete warehouseToSave.terminal; // Usuwamy stary klucz terminal (opcjonalnie)

        try {
            await axios.put(`/api/warehouses/${editWarehouse.id}`, warehouseToSave, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
            });

            setWarehouses((prevWarehouses) =>
                prevWarehouses.map((wh) =>
                    wh.id === editWarehouse.id ? { ...wh, ...editWarehouse } : wh
                )
            );
            handleEditClose();
        } catch (error) {
            console.error('Error updating warehouse:', error.response?.data);
        }
    };

    const handleEditChange = (field, value) => {
        setEditWarehouse({ ...editWarehouse, [field]: value });
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'capacity', headerName: 'Capacity', width: 200 },
        { field: 'occupancy', headerName: 'Occupancy', width: 200 },
        { field: 'terminal', headerName: 'Terminal', width: 200 },
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

    const rows = warehouses.map((warehouse) => ({
        id: warehouse.id,
        capacity: warehouse.capacity,
        occupancy: warehouse.occupancy,
        terminal: warehouse.terminal?.name
    }));

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                background: 'url(warehouses.jpg) center center / cover no-repeat',
                overflowX: 'hidden',
                padding: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* Panel Container */}
            <Box
                sx={{
                    width: '90%',
                    maxWidth: '1000px',
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
                        Zarządzanie magazynami
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRegisterOpen}
                        sx={{
                            fontWeight: 'bold',
                        }}
                    >
                        Zarejestruj magazyn
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
                        checkboxSelection
                        disableRowSelectionOnClick
                        sx={{
                            fontSize: { xs: '0.8rem', sm: '1rem' },
                        }}
                    />
                </Box>
            </Box>

            {/* Edit Warehouse Dialog */}
            <Dialog open={editDialogOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
                <DialogTitle>Edytuj magazyn</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Capacity"
                        value={editWarehouse?.capacity || ''}
                        onChange={(e) => handleEditChange('capacity', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Occupancy"
                        value={editWarehouse?.occupancy || ''}
                        onChange={(e) => handleEditChange('occupancy', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Terminal"
                        value={newWarehouse.terminalId}
                        onChange={(e) => handleRegisterChange('terminalId', e.target.value)}
                        margin="normal"
                        fullWidth
                        select
                    >
                        {/* Ensure "No Terminal" sets a null-like value */}
                        <MenuItem value="">No Terminal</MenuItem>
                        {terminals.map((terminal) => (
                            <MenuItem key={terminal.id} value={terminal.id}>
                                {terminal.name}
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

            {/* Register Warehouse Dialog */}
            <Dialog open={registerDialogOpen} onClose={handleRegisterClose} fullWidth maxWidth="sm">
                <DialogTitle>Zarejestruj nowy magazyn</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Capacity"
                        value={newWarehouse.capacity}
                        onChange={(e) => handleRegisterChange('capacity', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Occupancy"
                        value={newWarehouse.occupancy}
                        onChange={(e) => handleRegisterChange('occupancy', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Terminal"
                        value={newWarehouse.terminalId}
                        onChange={(e) => handleRegisterChange('terminalId', e.target.value)}
                        margin="normal"
                        fullWidth
                        select
                    >
                        <MenuItem value="">No Terminal</MenuItem>
                        {terminals.map((terminal) => (
                            <MenuItem key={terminal.id} value={terminal.id}>
                                {terminal.name}
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

export default Warehouses;
