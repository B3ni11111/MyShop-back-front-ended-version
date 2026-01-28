import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import theme from "./Theme";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useAppContext } from "../App";
import { Link } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";

import type { BetterItemProps } from "../types/BetterItemProps";
import { catItem } from "../types/catItem";
import { CatItemProps } from "../types/catItemProps";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: theme.palette.background.paper,
    border: `2px solid ${theme.palette.secondary.main}`,
    boxShadow: 24,
    borderRadius: "20px",
    p: 4,
    color: theme.palette.text.primary,
};

export default function CatItem({ i }: CatItemProps) {




    return (
        <>
            <Link to={`/items-layout/${i.name}`}>

                <Card
                    sx={{
                        borderRadius: "20px",
                        cursor: "pointer",
                        width: "100%",
                        maxWidth: 280,
                        height: 360,
                        mx: "auto",
                        "&:hover": { boxShadow: 6 },
                    }}>
                    <CardContent
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            p: 2,
                        }}>
                        <img src={i.img} alt={i.name} />
                        <h3>{i.name}</h3>



                    </CardContent>
                </Card>
            </Link>


        </>
    );
}
