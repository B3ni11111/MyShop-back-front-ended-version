import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import type { CatItem as CatItemType, SubCategory } from "../types/catItem";

interface CatItemProps {
  category?: CatItemType;
  subCategory?: SubCategory;
  mainCategoryPath?: string;
  isMainCategory?: boolean;
}

export default function CatItem({
  category,
  subCategory,
  mainCategoryPath,
  isMainCategory = false,
}: CatItemProps) {
  const linkPath = isMainCategory
    ? `/${category!.path}`
    : `/${mainCategoryPath}/${subCategory!.path}`;

  const displayImg = isMainCategory ? category!.img : subCategory!.img;

  const displayName = isMainCategory ? category!.main : subCategory!.name;

  return (
    <Card
      component={Link}
      to={linkPath}
      sx={{
        width: "100%",
        maxWidth: 280,
        textDecoration: "none",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={displayImg}
        alt={displayName}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" align="center">
          {displayName}
        </Typography>
      </CardContent>
    </Card>
  );
}
