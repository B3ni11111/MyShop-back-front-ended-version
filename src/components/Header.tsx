import { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";

import SearchIcon from "@mui/icons-material/Search";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Link } from "react-router-dom";

import logo from "../assets/imgs/logo.jpg";

interface HeaderProps {
  cartCount?: number;
}

export default function Header({ cartCount = 0 }: HeaderProps) {
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ mb: 1, bgcolor: "#172029" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 56, md: 60 } }}>
          <Link to={"/"}>
            <img
              src={logo}
              alt="Benny's Shop"
              style={{ height: 48, width: "auto", display: "block" }}
            />
          </Link>
          <Tooltip title="Home">
            <Typography
              component={Link}
              to={"/"}
              sx={{
                textAlign: "center",
                pl: 2,
                textDecoration: "none",
                color: "white",
              }}
            >
              Home
            </Typography>
          </Tooltip>
          <Tooltip title="About">
            <Typography
              component={Link}
              to={"about"}
              sx={{
                textAlign: "center",
                pl: 2,
                textDecoration: "none",
                color: "white",
                mr: 1,
              }}
            >
              About
            </Typography>
          </Tooltip>

          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
              mx: "auto", // 🔥 זה הקסם
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="עוד לא מוכן!!"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            ></Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box
            sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 1 }}
          >
            <Link to={"fav"}>
              <Tooltip title="Favorites">
                <IconButton>
                  <FavoriteIcon sx={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            </Link>
            <Link to={"cart"}>
              <Tooltip title="Shopping Cart">
                <IconButton>
                  <Badge badgeContent={cartCount} color="error">
                    <ShoppingCartIcon sx={{ color: "white" }} />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link to={"about"}>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      pl: 2,
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    Profile
                  </Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
