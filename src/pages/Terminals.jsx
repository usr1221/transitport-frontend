import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    MenuItem,
} from "@mui/material";
import "../global.css";
import { DataGrid } from "@mui/x-data-grid";
import axios from "../axiosInstance";
import { useNavigate } from "react-router-dom";

function Terminals() {
    const [terminals, setTerminals] = useState([]);
    const [ports, setPorts] = useState([]); // State for ports
    const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [newTerminal, setNewTerminal] = useState({
        name: "",
        wharvesCount: "",
        portId: "",
    });
    const [editTerminal, setEditTerminal] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const [terminalsResponse, portsResponse] = await Promise.all([
                axios.get("/api/terminals", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
                }),
                axios.get("/api/ports", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
                }),
            ]);

            setTerminals(terminalsResponse.data);
            setPorts(portsResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error.response?.data);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRegisterOpen = () => {
        setRegisterDialogOpen(true);
    };

    const handleRegisterClose = () => {
        setRegisterDialogOpen(false);
        setNewTerminal({
            name: "",
            wharvesCount: "",
            portId: "",
        });
    };

    const handleRegisterChange = (field, value) => {
        setNewTerminal({ ...newTerminal, [field]: value });
    };

    const handleRegisterSubmit = async () => {
        try {
            await axios.post("/api/terminals", newTerminal, {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
            });

            await fetchData();
            alert("Terminal dodany poprawnie!");
            handleRegisterClose();
        } catch (error) {
            console.error("Błąd dodawania terminala:", error.response?.data);
            alert("Błąd dodawania terminala. Sprawdź wprowadzone dane i spróbuj ponownie.");
        }
    };

    const handleEditOpen = (terminal) => {
        setEditTerminal(terminal);
        setEditDialogOpen(true);
    };

    const handleEditClose = () => {
        setEditDialogOpen(false);
        setEditTerminal(null);
    };

    const handleEditChange = (field, value) => {
        setEditTerminal({ ...editTerminal, [field]: value });
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`/api/terminals/${editTerminal.id}`, editTerminal, {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
            });

            await fetchData();
            alert("Edycja terminala poprawna");
            handleEditClose();
        } catch (error) {
            console.error("Błąd edycji terminala:", error.response?.data);

            alert(
                `Błąd edycji terminala. ${
                    error.response?.data?.message || "Sprawdź wprowadzone dane i spróbuj ponownie."
                }`
            );
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/terminals/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
            });
            setTerminals(terminals.filter((terminal) => terminal.id !== id));
        } catch (error) {
            console.error("Błąd usuwania terminala:", error.response?.data);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Nazwa", width: 200 },
        { field: "wharvesCount", headerName: "Liczba nabrzeży", width: 150 },
        { field: "portName", headerName: "Port", width: 200 },
        {
            field: "actions",
            headerName: "Akcje",
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

    const rows = terminals.map((terminal) => ({
        id: terminal.id,
        name: terminal.name,
        wharvesCount: terminal.wharvesCount,
        portName: terminal.port?.name || "Brak danych", // Show port name instead of ID
    }));

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: "100vh",
                background: "url(terminals.jpg) center center / cover no-repeat",
                overflowX: "hidden",
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
            <Box
                sx={{
                    width: "90%",
                    maxWidth: "1000px",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "16px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                    padding: "20px",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "bold",
                            color: "#333",
                        }}
                    >
                        Zarządzanie terminalami
                    </Typography>

                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleRegisterOpen}
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        Dodaj terminal
                    </Button>
                </Box>

                <Box
                    sx={{
                        height: "400px",
                        overflow: "hidden",
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
                            fontSize: { xs: "0.8rem", sm: "1rem" },
                        }}
                    />
                </Box>
            </Box>

            {/* Register Terminal Dialog */}
            <Dialog open={registerDialogOpen} onClose={handleRegisterClose} fullWidth maxWidth="sm">
                <DialogTitle>Dodaj nowy terminal</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nazwa"
                        value={newTerminal.name}
                        onChange={(e) => handleRegisterChange("name", e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Liczba nabrzeży"
                        value={newTerminal.wharvesCount}
                        onChange={(e) => handleRegisterChange("wharvesCount", e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Port"
                        value={newTerminal.portId}
                        onChange={(e) => handleRegisterChange("portId", e.target.value)}
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
                        Dodaj terminal
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Terminal Dialog */}
            <Dialog open={editDialogOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
                <DialogTitle>Edytuj terminal</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nazwa"
                        value={editTerminal?.name || ""}
                        onChange={(e) => handleEditChange("name", e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Liczba nabrzeży"
                        value={editTerminal?.wharvesCount || ""}
                        onChange={(e) => handleEditChange("wharvesCount", e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Port"
                        value={editTerminal?.portId || ""}
                        onChange={(e) => handleEditChange("portId", e.target.value)}
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
                    <Button onClick={handleEditSubmit} color="primary">
                        Zapisz
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Terminals;
