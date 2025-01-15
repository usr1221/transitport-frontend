import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ConditionalAppBar from "../components/ConditionalAppBar";

function Admin() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                height: "100vh", // Pełna wysokość widoku
                backgroundImage: 'url("admin.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "relative", // Aby utrzymać elementy w odpowiednich miejscach
            }}
        >
            {/* Pasek nawigacyjny na górze */}
            <ConditionalAppBar />

            {/* Główna siatka z panelami */}
            <Grid
                container
                spacing={4}
                sx={{
                    height: "calc(100vh - 64px)", // Wysokość widoku minus AppBar
                    padding: "32px",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {/* Panel Zarządzaj pracownikami */}
                <Grid item xs={12} sm={6}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.9)",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                            overflow: "hidden",
                            position: "relative",
                            height: "200px",
                        }}
                    >
                        {/* Tekst */}
                        <Box
                            sx={{
                                padding: "20px",
                                zIndex: 1,
                                flex: 1,
                                textAlign: "left",
                            }}
                        >
                            <Typography variant="h6" sx={{ color: "white", marginBottom: "16px" }}>
                                Zarządzaj pracownikami
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => navigate("/employees")}
                                sx={{
                                    backgroundColor: "white",
                                    color: "black",
                                    "&:hover": { backgroundColor: "gray", color: "white" },
                                }}
                            >
                                Przejdź
                            </Button>
                        </Box>
                        {/* Obraz */}
                        <Box
                            sx={{
                                width: "50%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src="workers.jpg"
                                alt="Zarządzaj pracownikami"
                                style={{
                                    height: "100%",
                                    width: "auto",
                                }}
                            />
                        </Box>
                    </Box>
                </Grid>

                {/* Panel Zarządzaj statkami */}
                <Grid item xs={12} sm={6}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.9)",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                            overflow: "hidden",
                            position: "relative",
                            height: "200px",
                        }}
                    >
                        {/* Tekst */}
                        <Box
                            sx={{
                                padding: "20px",
                                zIndex: 1,
                                flex: 1,
                                textAlign: "left",
                            }}
                        >
                            <Typography variant="h6" sx={{ color: "white", marginBottom: "16px" }}>
                                Zarządzaj statkami
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => navigate("/ships")}
                                sx={{
                                    backgroundColor: "white",
                                    color: "black",
                                    "&:hover": { backgroundColor: "gray", color: "white" },
                                }}
                            >
                                Przejdź
                            </Button>
                        </Box>
                        {/* Obraz */}
                        <Box
                            sx={{
                                width: "50%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src="ships.jpg"
                                alt="Zarządzaj statkami"
                                style={{
                                    height: "100%",
                                    width: "auto",
                                }}
                            />
                        </Box>
                    </Box>
                </Grid>

                {/* Panel Zarządzaj terminalami */}
                <Grid item xs={12} sm={6}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.9)",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                            overflow: "hidden",
                            position: "relative",
                            height: "200px",
                        }}
                    >
                        {/* Tekst */}
                        <Box
                            sx={{
                                padding: "20px",
                                zIndex: 1,
                                flex: 1,
                                textAlign: "left",
                            }}
                        >
                            <Typography variant="h6" sx={{ color: "white", marginBottom: "16px" }}>
                                Zarządzaj terminalami
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => navigate("/terminals")}
                                sx={{
                                    backgroundColor: "white",
                                    color: "black",
                                    "&:hover": { backgroundColor: "gray", color: "white" },
                                }}
                            >
                                Przejdź
                            </Button>
                        </Box>
                        {/* Obraz */}
                        <Box
                            sx={{
                                width: "50%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src="terminals.jpg"
                                alt="Zarządzaj terminalami"
                                style={{
                                    height: "100%",
                                    width: "auto",
                                }}
                            />
                        </Box>
                    </Box>
                </Grid>

                {/* Panel Zarządzaj magazynami */}
                <Grid item xs={12} sm={6}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.9)",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                            overflow: "hidden",
                            position: "relative",
                            height: "200px",
                        }}
                    >
                        {/* Tekst */}
                        <Box
                            sx={{
                                padding: "20px",
                                zIndex: 1,
                                flex: 1,
                                textAlign: "left",
                            }}
                        >
                            <Typography variant="h6" sx={{ color: "white", marginBottom: "16px" }}>
                                Zarządzaj magazynami
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => navigate("/warehouses")}
                                sx={{
                                    backgroundColor: "white",
                                    color: "black",
                                    "&:hover": { backgroundColor: "gray", color: "white" },
                                }}
                            >
                                Przejdź
                            </Button>
                        </Box>
                        {/* Obraz */}
                        <Box
                            sx={{
                                width: "50%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src="warehouses.jpg"
                                alt="Zarządzaj magazynami"
                                style={{
                                    height: "100%",
                                    width: "auto",
                                }}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>


        </Box>
    );
}

export default Admin;
