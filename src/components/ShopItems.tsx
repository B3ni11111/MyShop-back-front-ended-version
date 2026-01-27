import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import BetterItem from "./BetterItem";

import Card from "@mui/material/Card";
import { Rowing } from "@mui/icons-material";
import { useAppContext } from "../App";
export default function ShopItems() {
  const { itemsData } = useAppContext();

  return (
    <>
      <Typography variant="h1">Shop</Typography>
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
          {itemsData.map((i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i.id}>
              <BetterItem i={i} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>);
}
