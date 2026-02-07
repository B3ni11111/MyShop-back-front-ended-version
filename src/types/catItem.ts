export interface Item {
    id: number;
    product: string;
    price: number;
    img: string;
    info: string;
    category: {
        main: string;
        secondary: string;
        brand: string;
    };
}

export interface SubCategory {
    name: string;
    img: string;
    path: string;
    brandImg: any
}

export interface CatItem {
    main: string;
    secondary: SubCategory[];
    img: string;
    path: string;
}