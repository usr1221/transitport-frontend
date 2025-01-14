import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountAppBar from "../components/AccountAppBar";
import ConditionalAppBar from "../components/ConditionalAppBar";

function Warehouse() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                height: "100vh", // Pełna wysokość widoku
                backgroundImage: 'url("contact.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "relative", // Aby utrzymać elementy w odpowiednich miejscach
            }}
        >
            {/* Pasek nawigacyjny na górze */}
            <ConditionalAppBar />

            {/* Wyśrodkowany przezroczysty box */}
            <Box
                sx={{
                    position: "absolute", // Niezależne pozycjonowanie boxa
                    top: "50%", // Wyśrodkowanie w pionie
                    left: "50%", // Wyśrodkowanie w poziomie
                    transform: "translate(-50%, -50%)", // Przesunięcie, aby box był dokładnie w środku
                    backgroundColor: "rgba(0, 0, 0, 0.7)", // Czarno-przezroczyste tło
                    padding: "2rem", // Odstępy wewnętrzne
                    borderRadius: "8px", // Zaokrąglone rogi
                    textAlign: "center", // Wyśrodkowanie tekstu
                }}
            >
                <Typography
                    variant="h6"
                    component="h1"
                    sx={{fontSize: "48px", color: "white" }} // Biały kolor tekstu
                >
                    Kontakt:
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ fontSize: "24px", color: "white", marginTop: "1rem" }} // Dodatkowy odstęp na tekst
                >
                    MAGAZYN: <br/>
                    ul. Portowa 1 <br/>
                    12-345 Portowo <br/>
                    Telefon: <br/>
                    +48 997998999<br/>
                    +48 223344123<br/>
                    E-mail: <br/>
                    MAGAZYNIER@port.pl
                </Typography>
            </Box>
        </Box>
    );
}

export default Warehouse;
