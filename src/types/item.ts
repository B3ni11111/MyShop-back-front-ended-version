export interface Item {
    id: number | string;
    product: string;
    price: number;
    category: {
    
        main: string,
        secondary: string,
        brand: string
    
    };
    img: string;
    info: string;
  }