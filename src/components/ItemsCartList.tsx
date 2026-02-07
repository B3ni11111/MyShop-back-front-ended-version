import React from "react";
import { Box, Card, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import { Link } from "react-router-dom";
import { useAppContext } from "../App";

export default function ItemsCartList() {
  const { cart, removeFromCart, updateQuantity, resetCart } = useAppContext();

  const getTotalPrice = () => {
    return cart.reduce((total, i) => total + i.price * i.quantity, 0);
  };

  if (cart.length === 0) {
    return (
      <Box sx={{ bgcolor: "background.paper", p: 3, borderRadius: 2 }}>
        <Typography variant="h4">Your Cart is Empty</Typography>
      </Box>
    );
  }
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {cart.map((i) => (
          <Card
            key={i.id}
            sx={{
              display: "flex",
              p: 2,
              gap: 2,
            }}
          >
            <img
              src={i.img}
              alt={i.product}
              style={{
                maxWidth: "100px",
                maxHeight: "100px",
                width: "auto",
                height: "auto",
                objectFit: "contain",
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {i.product}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                ₪{i.price}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <IconButton component={Link} to={`/item-page/${i.id}`}>
                  <LaunchIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => updateQuantity(i.id, i.quantity - 1)}
                  sx={{ bgcolor: "background.default" }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography
                  variant="body1"
                  sx={{
                    minWidth: "30px",
                    textAlign: "center",
                  }}
                >
                  {i.quantity}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => updateQuantity(i.id, i.quantity + 1)}
                  sx={{ bgcolor: "background.default" }}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => removeFromCart(i.id)}
                  sx={{ color: "error.main", ml: 2 }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Typography variant="h6">
                ₪{(i.price * i.quantity).toFixed(2)}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </>
  );
}
