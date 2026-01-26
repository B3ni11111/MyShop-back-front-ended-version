import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useContext } from "react";
import { AppContext } from "../App";

export default function ThemeToggle() {
  const { mode, toggleTheme } = useContext(AppContext)
  return (
    <Tooltip title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
      <IconButton onClick={toggleTheme} sx={{ color: "white" }}>
        {mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
