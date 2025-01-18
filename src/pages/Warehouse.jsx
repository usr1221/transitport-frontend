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

function Warehouse() {
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
            alert('Warehouse registered successfully!');
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
        try {
            await axios.put(`/api/warehouses/${editWarehouse.id}`, editWarehouse, {
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
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    const rows = warehouses.map((warehouse) => ({
        id: warehouse.id,
        capacity: warehouse.capacity,
        occupancy: warehouse.occupancy,
        terminal: warehouse.terminal?.id || 'No Terminal',
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
                Register Warehouse
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
                <DialogTitle>Edit Warehouse</DialogTitle>
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
                        value={editWarehouse?.terminal || ''}
                        onChange={(e) => handleEditChange('terminal', e.target.value)}
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
                    <Button onClick={handleEditClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleEditSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={registerDialogOpen} onClose={handleRegisterClose}>
                <DialogTitle>Register New Warehouse</DialogTitle>
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
                        Cancel
                    </Button>
                    <Button onClick={handleRegisterSubmit} color="primary">
                        Register
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Warehouse;
