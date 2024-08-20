export interface OrderLine {
  id: number;
  quantity: number;
 
  product: {
    id: number;
    name: string;
    imageProduct: string;
    description: string;
    price: number;
    availableQuantity: number;
  };
  order: {
    id: number;
  };
}
