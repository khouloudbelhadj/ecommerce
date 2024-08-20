export interface Product {
  id: number;
  reference: string;
  name: string;
  description: string;
  availableQuantity: number;
  price: number;
  imageProduct: string;
  category: any; 
}