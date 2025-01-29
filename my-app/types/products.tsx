export interface Product {
  title: string;
  description: string;
  image?: {
    asset: {
      _ref: string;
      _type: "image";
    };
  };
  price: number;
  tags: string[];
  discountPercentage: number;
  isNew: boolean;
}
