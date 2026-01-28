import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import BetterItem from "./BetterItem";
import { useParams } from "react-router-dom";

import Card from "@mui/material/Card";
import { Rowing } from "@mui/icons-material";
import { useAppContext } from "../App";

export default function ShopItems() {
  const { itemsData } = useAppContext();

  const { cat } = useParams<{ cat: string }>()
  const filteredItems = itemsData.filter(
    (i) => i.category === cat
  );

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
          {filteredItems.map((i) => (
            <Grid item key={i.id}>
              <BetterItem i={i} />
            </Grid>
          ))}
        </Grid>




      </Box>
    </>);
}
