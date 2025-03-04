export type GetAllProduct = {
    productId: string;
    productName: string;
    stock: number;
    price: number;
    profit: number;
    createddate: string;
    updateddate: string;
    createdby: string;
    updatedby: string;
    activeFlag: boolean;
  };
  
  export type Product = {
    productId: string;
    productName: string;
    stock: number;
    price: number;
    profit: number;
    createddate: string;
    updateddate: string;
  };
  
  export type UpdateProduct = {
    productName: string;
    stock: number;
    price: number;
    profit: number;
  };
  
  export type DeleteProduct = {
    productId: string;
  };
  
  export type Cart = {
    productId: string;
    productName: string;
    quantitySold: number;
    stock: number;
    price: number;
    profit: number;
  };
  
  