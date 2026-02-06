import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography, Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import BetterItem from "./BetterItem";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../App";
import Sorted from "./SortMui";
import { catData } from "../catData";

export default function ShopItems() {
  const { itemsData } = useAppContext();
  const { mainCat, subCat } = useParams<{ mainCat: string; subCat: string }>();

  const mainCategory = catData.find((cat) => cat.path === mainCat);
  const subCategory = mainCategory?.secondary.find(
    (sub) => sub.path === subCat,
  );

  const isAll = subCat?.toLowerCase() === "all";
  const filteredItems = itemsData.filter(
    (item) =>
      item.category.main.toLowerCase() === mainCat?.toLowerCase() &&
      (isAll ||
        item.category.secondary.toLowerCase() === subCat?.toLowerCase()),
  );

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
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 3 }}
      >
        <Typography
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "text.secondary",
            "&:hover": { color: "text.primary" },
          }}
        >
          Home
        </Typography>
        <Typography
          component={Link}
          to={`/${mainCat}`}
          sx={{
            textDecoration: "none",
            color: "text.secondary",
            "&:hover": { color: "text.primary" },
          }}
        >
          {mainCategory?.main}
        </Typography>
        <Typography color="text.primary">
          {isAll ? "All" : subCategory?.name}
        </Typography>
      </Breadcrumbs>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">
          {isAll ? "All" : subCategory?.name}
        </Typography>
        {filteredItems.length !== 0 && <Sorted />}
      </Box>

      <Grid container spacing={1.5} justifyContent="center">
        {filteredItems.map((item) => (
          <Grid
            key={item.id}
            item
            xs={6}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <BetterItem i={item} />
          </Grid>
        ))}
      </Grid>

      {filteredItems.length === 0 && (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No Items in this category yet... Press here to{" "}
          {<Link to={"/"}>return home</Link>}
        </Typography>
      )}
    </Box>
  );
}
