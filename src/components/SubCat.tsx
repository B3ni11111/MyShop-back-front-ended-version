import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography, Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useParams, Link } from "react-router-dom";
import CatItem from "./CatItem";
import { catData } from "../catData";
import NotFound from "./NotFound";

export default function SubCategory() {
  const { mainCat } = useParams<{ mainCat: string }>();

  const mainCategory = catData.find((cat) => cat.path === mainCat);

  if (!mainCategory) {
    return <NotFound />;
  }

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
        <Typography color="text.primary">{mainCategory.main}</Typography>
      </Breadcrumbs>

      <Typography variant="h4" sx={{ mb: 3 }}>
        {mainCategory.main}
      </Typography>

      <Grid container spacing={1.5} justifyContent="center">
        {mainCategory.secondary.map((sub) => (
          <Grid
            key={sub.path}
            item
            xs={6}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <CatItem
              subCategory={sub}
              mainCategoryPath={mainCategory.path}
              isMainCategory={false}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
