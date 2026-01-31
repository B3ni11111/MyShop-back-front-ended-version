import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import CatItem from "./CatItem";
import { catData } from "../catData";

export default function Home() {
    return (
        <>


            <Box
                sx={{
                    bgcolor: "background.default",
                    p: 2,
                    minHeight: "100vh",
                    maxWidth: 1400,
                    mx: "auto",
                }}
            >
                <Grid container spacing={3}>
                    {catData.map((i) => (
                        <Grid
                            key={i.name}
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            component="div"
                        >
                            <CatItem i={i} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}
