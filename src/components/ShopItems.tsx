import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import BetterItem from "./BetterItem";
import { useParams } from "react-router-dom";
import { useAppContext } from "../App";


export default function ShopItems() {
  const { itemsData } = useAppContext();
  const { cat } = useParams<{ cat: string }>()
  const filteredItems = itemsData.filter(
    (i) => i.category === cat
  );

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
          {filteredItems.map((i) => (
            <Grid item key={i.id}>
              <BetterItem i={i} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>);
}
