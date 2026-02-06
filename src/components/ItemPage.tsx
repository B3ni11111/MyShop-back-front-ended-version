import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../App";
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  Breadcrumbs,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function ItemPage() {
  const { itemsData, addToCart, toggleFav, fav } = useAppContext();
  const { id } = useParams<{ id: string }>();

  const item = itemsData?.find((i) => String(i.id) === id);

  if (!item) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h5" gutterBottom>
          Item not found
        </Typography>
        <Button component={Link} to="/" variant="contained">
          Back to Home
        </Button>
      </Container>
    );
  }

  const isFav = fav.some((f) => f.id === item.id);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
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
          to={`/items-layout/${item.category}`}
          sx={{
            textDecoration: "none",
            color: "text.secondary",
            "&:hover": { color: "text.primary" },
          }}
        >
          {item.category.main}
        </Typography>
        <Typography
          color="text.primary"
          sx={{
            maxWidth: 200,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.product}
        </Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                aspectRatio: "1 / 1",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: { xs: 2, sm: 3, md: 4 },
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={item.img}
                alt={item.product}
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  minWidth: 120,
                  minHeight: 120,
                  objectFit: "contain",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1.5, md: 2 },
            }}
          >
            <Box
              sx={{
                width: { xs: 80, md: 100 },
                height: { xs: 30, md: 40 },
                bgcolor: "action.hover",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontStyle: "italic", color: "text.disabled" }}
              >
                BRAND
              </Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.25rem", sm: "1.4rem", md: "1.5rem" },
              }}
            >
              {item.product}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "primary.main",
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              }}
            >
              ₪{item.price}
            </Typography>
            <Divider />
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", lineHeight: 1.7 }}
            >
              {item.info}
            </Typography>
            <Divider />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 1.5,
                alignItems: { sm: "center" },
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "none",
                  color: "background.default",
                  fontWeight: 600,
                  px: 3,
                }}
              >
                Buy Now!
              </Button>
              <Button
                variant="outlined"
                startIcon={<AddShoppingCartIcon />}
                onClick={() => addToCart(item)}
                sx={{ textTransform: "none", px: 3 }}
              >
                Add to Cart
              </Button>
              <IconButton
                onClick={() => toggleFav(item)}
                color="error"
                sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}
              >
                {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
