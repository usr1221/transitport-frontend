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
    Typography,
} from '@mui/material';
import '../global.css';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../axiosInstance';

function Ships() {
    const [ships, setShips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editShip, setEditShip] = useState(null);
    const [wharfs, setWharfs] = useState([]);
    const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
    const [newShip, setNewShip] = useState({
        name: '',
        homePort: '',
        draft: '',
        length: '',
        callSign: '',
        type: '',
        wharf: '',
    });

    useEffect(() => {
        const fetchShips = async () => {
            try {
                const response = await axios.get('/api/ships', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
                });
                setShips(response.data);
            } catch (error) {
                console.error('Error fetching ships:', error.response?.data);
            } finally {
                setLoading(false);
            }
        };

        fetchShips();
    }, []);

    useEffect(() => {
        const fetchWharfs = async () => {
            try {
                const response = await axios.get('/api/wharfs', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
                });
                setWharfs(response.data);
            } catch (error) {
                console.error('Error fetching wharfs:', error.response?.data);
            }
        };

        fetchWharfs();
    }, []);

    const handleRegisterOpen = () => {
        setRegisterDialogOpen(true);
    };

    const handleRegisterClose = () => {
        setRegisterDialogOpen(false);
        setNewShip({
            name: '',
            homePort: '',
            draft: '',
            length: '',
            callSign: '',
            type: '',
            wharf: '',
        });
    };

    const handleRegisterChange = (field, value) => {
        setNewShip({ ...newShip, [field]: value });
    };

    const handleRegisterSubmit = async () => {
        try {
            await axios.post('/api/ships', newShip, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
            });
            alert('Ship registered successfully!');
            handleRegisterClose();
        } catch (error) {
            console.error('Error registering ship:', error.response?.data);
            alert('Failed to register ship. Please check the inputs.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/ships/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
            });
            setShips(ships.filter((ship) => ship.id !== id));
        } catch (error) {
            console.error('Error deleting ship:', error.response?.data);
        }
    };

    const handleEditOpen = (ship) => {
        setEditShip(ship);
        setEditDialogOpen(true);
    };

    const handleEditClose = () => {
        setEditDialogOpen(false);
        setEditShip(null);
    };

    const handleEditSave = async () => {
        const shipToSave = {
            ...editShip,
            wharf: editShip.wharf?.id || '',
        };

        try {
            await axios.put(`/api/ships/${editShip.id}`, shipToSave, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
            });

            setShips((prevShips) =>
                prevShips.map((sh) => (sh.id === editShip.id ? { ...sh, ...shipToSave } : sh))
            );
            handleEditClose();
        } catch (error) {
            console.error('Error updating ship:', error.response?.data);
        }
    };

    const handleEditChange = (field, value) => {
        if (field === 'wharf') {
            setEditShip({
                ...editShip,
                wharf: value === '' ? null : { ...editShip.wharf, id: value },
            });
        } else {
            setEditShip({ ...editShip, [field]: value });
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'homePort', headerName: 'Home Port', width: 200 },
        { field: 'draft', headerName: 'Draft', width: 150 },
        { field: 'length', headerName: 'Length', width: 150 },
        { field: 'callSign', headerName: 'Call Sign', width: 200 },
        { field: 'type', headerName: 'Type', width: 150 },
        { field: 'wharf', headerName: 'Wharf', width: 150 },
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

    const rows = ships.map((ship) => ({
        id: ship.id,
        name: ship.name,
        homePort: ship.homePort,
        draft: ship.draft,
        length: ship.length,
        callSign: ship.callSign,
        type: ship.type,
        wharf: ship.wharf?.id || 'No Wharf',
    }));

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                background: 'url(ships.jpg) center center / cover no-repeat',
                overflowX: 'hidden', // Prevent horizontal scroll
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
                    maxWidth: '1600px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '16px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                    padding: '20px',
                    overflow: 'hidden', // Ensure no internal overflow
                    margin: '0 auto', // Center the panel
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
                        Zarządzanie statkami
                    </Typography>

                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleRegisterOpen}
                        sx={{
                            fontWeight: 'bold',
                        }}
                    >
                        Dodaj statek
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

            {/* Edit Ship Dialog */}
            <Dialog open={editDialogOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
                <DialogTitle>Edit Ship</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        value={editShip?.name || ''}
                        onChange={(e) => handleEditChange('name', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Home Port"
                        value={editShip?.homePort || ''}
                        onChange={(e) => handleEditChange('homePort', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Draft"
                        value={editShip?.draft || ''}
                        onChange={(e) => handleEditChange('draft', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Length"
                        value={editShip?.length || ''}
                        onChange={(e) => handleEditChange('length', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Call Sign"
                        value={editShip?.callSign || ''}
                        onChange={(e) => handleEditChange('callSign', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Type"
                        value={editShip?.type || ''}
                        onChange={(e) => handleEditChange('type', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Wharf"
                        value={editShip?.wharf?.id || ''}
                        onChange={(e) => handleEditChange('wharf', e.target.value)}
                        margin="normal"
                        fullWidth
                        select
                    >
                        <MenuItem value="">No Wharf</MenuItem>
                        {wharfs.map((wharf) => (
                            <MenuItem key={wharf.id} value={wharf.id}>
                                {wharf.name}
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

            {/* Register Ship Dialog */}
            <Dialog open={registerDialogOpen} onClose={handleRegisterClose} fullWidth maxWidth="sm">
                <DialogTitle>Register New Ship</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        value={newShip.name}
                        onChange={(e) => handleRegisterChange('name', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Home Port"
                        value={newShip.homePort}
                        onChange={(e) => handleRegisterChange('homePort', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Draft"
                        value={newShip.draft}
                        onChange={(e) => handleRegisterChange('draft', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Length"
                        value={newShip.length}
                        onChange={(e) => handleRegisterChange('length', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Call Sign"
                        value={newShip.callSign}
                        onChange={(e) => handleRegisterChange('callSign', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Type"
                        value={newShip.type}
                        onChange={(e) => handleRegisterChange('type', e.target.value)}
                        margin="normal"
                        fullWidth
                        select // Converts TextField into a dropdown
                    >
                        <MenuItem value="Kontenerowiec">Kontenerowiec</MenuItem>
                        <MenuItem value="Masowiec">Masowiec</MenuItem>
                        <MenuItem value="Tankowiec">Tankowiec</MenuItem>
                        <MenuItem value="Inny">Inny</MenuItem>
                    </TextField>

                    <TextField
                        label="Wharf"
                        value={newShip.wharf}
                        onChange={(e) => handleRegisterChange('wharf', e.target.value)}
                        margin="normal"
                        fullWidth
                        select
                    >
                        <MenuItem value="">No Wharf</MenuItem>
                        {wharfs.map((wharf) => (
                            <MenuItem key={wharf.id} value={wharf.id}>
                                {wharf.name}
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

export default Ships;
