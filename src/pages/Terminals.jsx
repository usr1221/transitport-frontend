import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "../axiosInstance";

function Terminals() {
    const [terminals, setTerminals] = useState([]);
    const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [newTerminal, setNewTerminal] = useState({
        name: "",
        wharvesCount: "",
        portId: "",
    });
    const [editTerminal, setEditTerminal] = useState(null);

    useEffect(() => {
        const fetchTerminals = async () => {
            try {
                const response = await axios.get("/api/terminals", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
                });
                setTerminals(response.data);
            } catch (error) {
                console.error("Error fetching terminals:", error.response?.data);
            }
        };

        fetchTerminals();
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
            alert("Terminal registered successfully!");
            handleRegisterClose();
        } catch (error) {
            console.error("Error registering terminal:", error.response?.data);
        }
    };

    const handleEditOpen = (terminal) => {
        setEditTerminal(terminal); // Ustawienie edytowanego terminala
        setEditDialogOpen(true);   // Otworzenie dialogu
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
            alert("Terminal updated successfully!");

            // Aktualizacja listy terminali
            setTerminals((prevTerminals) =>
                prevTerminals.map((terminal) =>
                    terminal.id === editTerminal.id ? editTerminal : terminal
                )
            );

            handleEditClose();
        } catch (error) {
            console.error("Error updating terminal:", error.response?.data);
            alert("Failed to update terminal. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/terminals/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` },
            });
            setTerminals(terminals.filter((terminal) => terminal.id !== id));
        } catch (error) {
            console.error("Error deleting terminal:", error.response?.data);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Name", width: 200 },
        { field: "wharvesCount", headerName: "Wharves Count", width: 150 },
        { field: "portId", headerName: "Port ID", width: 150 },
        {
            field: "actions",
            headerName: "Actions",
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

    const rows = terminals.map((terminal) => ({
        id: terminal.id,
        name: terminal.name,
        wharvesCount: terminal.wharvesCount,
        portId: terminal.port?.id || "Brak danych",
    }));

    return (
        <Box sx={{ height: 400, width: "100%" }}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleRegisterOpen}
                sx={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    zIndex: 1,
                }}
            >
                ZAREJESTRUJ
            </Button>

            <DataGrid rows={rows} columns={columns} pageSizeOptions={[5]} />

            {/* Dialog rejestracji */}
            <Dialog open={registerDialogOpen} onClose={handleRegisterClose}>
                <DialogTitle>Zarejestruj nowy terminal</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        value={newTerminal.name}
                        onChange={(e) => handleRegisterChange("name", e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Wharves Count"
                        value={newTerminal.wharvesCount}
                        onChange={(e) => handleRegisterChange("wharvesCount", e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Port ID"
                        value={newTerminal.portId}
                        onChange={(e) => handleRegisterChange("portId", e.target.value)}
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

            {/* Dialog edycji */}
            <Dialog open={editDialogOpen} onClose={handleEditClose}>
                <DialogTitle>Edytuj terminal</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        value={editTerminal?.name || ""}
                        onChange={(e) => handleEditChange("name", e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Wharves Count"
                        value={editTerminal?.wharvesCount || ""}
                        onChange={(e) => handleEditChange("wharvesCount", e.target.value)}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        label="Port ID"
                        value={editTerminal?.portId || ""}
                        onChange={(e) => handleEditChange("portId", e.target.value)}
                        margin="normal"
                        fullWidth
                    />
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
