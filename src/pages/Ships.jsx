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
import { useNavigate } from 'react-router-dom';



function Ships() {
    const [ships, setShips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editShip, setEditShip] = useState(null);
    const [wharfs, setWharfs] = useState([]);
    const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
    const navigate = useNavigate();
    const [newShip, setNewShip] = useState({
        name: '',
        homePort: '',
        draft: '',
        length: '',
        callSign: '',
        type: '',
        wharf: '',
    });
    const fetchShips = async () => {
        try {
            const response = await axios.get('/api/ships', {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
            });
            setShips(response.data);
        } catch (error) {
            console.error('Error fetching ships:', error.response?.data);
        }
    };

    useEffect(() => {
        fetchShips();
    }, []);

    useEffect(() => {
        const fetchWharfs = async () => {
            try {
                const response = await axios.get('/api/wharves', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
                });
                setWharfs(response.data);
            } catch (error) {
                console.error('Error fetching wharves:', error.response?.data);
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

            await fetchShips(); // Pobierz zaktualizowaną listę statków

            alert('Statek dodany poprawnie!');
            handleRegisterClose(); // Zamknij dialog
        } catch (error) {
            console.error('Błąd rejestracji statku', error.response?.data);
            alert('Błąd rejestracji statku. Sprawdź wprowadzone wartości i spróbuj ponownie');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/ships/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
            });
            setShips(ships.filter((ship) => ship.id !== id));
        } catch (error) {
            console.error('Błąd usuwania statku:', error.response?.data);
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
            const response = await axios.put(`/api/ships/${editShip.id}`, shipToSave, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
            });

            // Aktualizuj listę statków
            setShips((prevShips) =>
                prevShips.map((sh) => (sh.id === editShip.id ? { ...response.data } : sh))
            );

            handleEditClose();
            alert('Edycja statku poprawna');
        } catch (error) {
            console.error('Błąd edycji statku:', error.response?.data);

            alert(
                `Błąd edycji statku. ${
                    error.response?.data?.message || 'Sprawdź wprowadzone wartości i spróbuj ponownie'
                }`
            );
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
        { field: 'name', headerName: 'Nazwa', width: 200 },
        { field: 'homePort', headerName: 'Port macierzysty', width: 200 },
        { field: 'draft', headerName: 'Zanurzenie', width: 150 },
        { field: 'length', headerName: 'Długość', width: 150 },
        { field: 'callSign', headerName: 'Sygnał wywoławczy', width: 200 },
        { field: 'type', headerName: 'Typ', width: 150 },
        { field: 'wharf', headerName: 'Nabrzeże', width: 150 },
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

    const rows = ships.map((ship) => ({
        id: ship.id,
        name: ship.name,
        homePort: ship.homePort,
        draft: ship.draft,
        length: ship.length,
        callSign: ship.callSign,
        type: ship.type,
        wharf: ship.wharf?.id || 'Brak nabrzeża',
    }));

    return (

        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                background: 'url(ships.jpg) center center / cover no-repeat',
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
                        label="Nazwa"
                        value={editShip?.name || ''}
                        onChange={(e) => handleEditChange('name', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Port macierzysty"
                        value={editShip?.homePort || ''}
                        onChange={(e) => handleEditChange('homePort', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Zanurzenie"
                        value={editShip?.draft || ''}
                        onChange={(e) => handleEditChange('draft', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Długość"
                        value={editShip?.length || ''}
                        onChange={(e) => handleEditChange('length', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Sygnał wywoławczy"
                        value={editShip?.callSign || ''}
                        onChange={(e) => handleEditChange('callSign', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Typ"
                        value={editShip?.type || ''}
                        onChange={(e) => handleEditChange('type', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Nabrzeże"
                        value={editShip?.wharf?.id || ''}
                        onChange={(e) => handleEditChange('wharf', e.target.value)}
                        margin="normal"
                        fullWidth
                        select
                    >
                        <MenuItem value="">No Wharf</MenuItem>
                        {wharfs.map((wharf) => (
                            <MenuItem key={wharf.id} value={wharf.id}>
                                {`Nabrzeże ${wharf.id} - Długość: ${wharf.length}, Głębokość: ${wharf.depth}`}
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

            {/* Register Ship Dialog */}
            <Dialog open={registerDialogOpen} onClose={handleRegisterClose} fullWidth maxWidth="sm">
                <DialogTitle>Register New Ship</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nazwa"
                        value={newShip.name}
                        onChange={(e) => handleRegisterChange('name', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Port macierzysty"
                        value={newShip.homePort}
                        onChange={(e) => handleRegisterChange('homePort', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Zanurzenie"
                        value={newShip.draft}
                        onChange={(e) => handleRegisterChange('draft', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Długość"
                        value={newShip.length}
                        onChange={(e) => handleRegisterChange('length', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Sygnał wywoławczy"
                        value={newShip.callSign}
                        onChange={(e) => handleRegisterChange('callSign', e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Typ"
                        value={newShip.type}
                        onChange={(e) => handleRegisterChange('type', e.target.value)}
                        margin="normal"
                        fullWidth
                        select
                    >
                        <MenuItem value="Kontenerowiec">Kontenerowiec</MenuItem>
                        <MenuItem value="Masowiec">Masowiec</MenuItem>
                        <MenuItem value="Tankowiec">Tankowiec</MenuItem>
                        <MenuItem value="Inny">Inny</MenuItem>
                    </TextField>

                    <TextField
                        label="Nabrzeże"
                        value={newShip.wharf}
                        onChange={(e) => handleRegisterChange('wharf', e.target.value)}
                        margin="normal"
                        fullWidth
                        select
                    >
                        <MenuItem value="">No Wharf</MenuItem>
                        {wharfs.map((wharf) => (
                            <MenuItem key={wharf.id} value={wharf.id}>
                                {`Nabrzeże ${wharf.id} - Długość: ${wharf.length}, Głębokość: ${wharf.depth}`}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRegisterClose} color="secondary">
                        Anuluj
                    </Button>
                    <Button onClick={handleRegisterSubmit} color="primary">
                        Dodaj
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>

    );
}

export default Ships;
