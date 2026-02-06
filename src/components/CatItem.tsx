import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
                    {img && <img src={img} alt={name} />}
                    <h3>{name}</h3>
                </CardContent>
            </Card>
        </Link>
    );
}
