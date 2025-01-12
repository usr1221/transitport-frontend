import React from 'react';
import {Container, Typography, Button, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ButtonAppBar from "../components/ButtonAppBar";
import TooltipPlus from "../components/TooltipPlus";

function Home() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                height: '100vh', // Pełna wysokość widoku
                backgroundImage: 'url("homepage.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center 50px',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <ButtonAppBar/>
            <TooltipPlus
                text="Posiadamy nabrzeża przystosowane do obsługi zarówno małych, jak i tych największych statków."
                positionTop="75%"
                positionLeft="80%">
                Obsługa statków
            </TooltipPlus>
            <TooltipPlus
                text="Oferujemy możliwość magazynowania towarów czekających na przeładunek."
                positionTop="35%"
                positionLeft="20%">
                Magazynowanie towarów
            </TooltipPlus>
            <TooltipPlus
                text="Nasze nowoczesne terminale przystosowane są do odbioru wielu towarów: od kontenerowych po ciekłe."
                positionTop="60%"
                positionLeft="35%">
                Terminale towarowe
            </TooltipPlus>
            <Box
                sx={{
                    position: 'fixed',
                    top: "40%",
                    left: "75%",
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "white",
                    fontSize: "110px",
                    fontWeight: "bold",
                    textAlign: "center",
                    lineHeight: "1.5",
                    zIndex: 1000,
                    padding: "20px",
                    borderRadius: "8px",
                    width: "600px",
                    maxWidth: "800px",
                    overflowWrap: "break-word",
                    whiteSpace: "normal",
                }}
            >
                Witamy w Porcie!
            </Box>
        </Box>

    );
}

export default Home;
