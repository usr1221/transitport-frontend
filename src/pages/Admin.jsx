import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountAppBar from "../components/AccountAppBar";
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
        </Box>
    );
}

export default Admin;
