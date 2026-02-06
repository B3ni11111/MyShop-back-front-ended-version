import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CatItem from "./CatItem";
import { catData } from "../catData";
import { Tooltip, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        p: 2,
        minHeight: "100vh",
        maxWidth: 1400,
        mx: "auto",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Welcome
      </Typography>
      <Grid container spacing={1.5} justifyContent="center">
        {catData.map((category) => (
          <Grid
            key={category.main}
            item
            xs={6}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <CatItem category={category} isMainCategory={true} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
