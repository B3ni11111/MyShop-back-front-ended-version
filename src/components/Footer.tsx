import { Box, Typography, Container } from "@mui/material";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: "primary.main",
                color: "white",
                py: 3,
                mt: "auto",
                textAlign: "center",
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body2">
                    © 2026 Benny's Shop. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
}
