import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { CatItemProps } from "../types/catItemProps";

export default function CatItem(props: CatItemProps) {
    const name = props.isMainCategory ? props.category.main : props.subCategory.name;
    const img = props.isMainCategory ? props.category.img : props.subCategory.img;
    const link = props.isMainCategory
        ? `/${props.category.path}`
        : `/${props.mainCategoryPath}/${props.subCategory.path}`;

    return (
        <Link to={link} style={{ textDecoration: 'none' }}>
            <Card
                sx={{
                    borderRadius: "5%",
                    cursor: "pointer",
                    width: "100%",
                    maxWidth: { xs: 200, sm: 240, md: 280 },
                    height: "100%",
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
                    <Box
                        sx={{
                            width: "100%",
                            height: { xs: "140px", sm: "170px", md: "200px" },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 1,
                            bgcolor: "#ffffff",
                            borderRadius: 1,
                        }}
                    >
                        {img && (
                            <img
                                src={img}
                                alt={name}
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    width: "auto",
                                    height: "auto",
                                    objectFit: "contain",
                                }}
                            />
                        )}
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{
                            mt: 1,
                            minHeight: "3em",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            wordWrap: "break-word",
                        }}
                    >
                        {name}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}
