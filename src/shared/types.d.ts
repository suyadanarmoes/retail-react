export type APIResponse<T> = {
    message: string;
    status: number;
    data: T;
  };
  
  export type ProductType = {
    productId: string;
    productName: string;
    stock: number;
    price: number;
    profit: number;
    createddate: string;
    updateddate: string;
    createdbBy: string;
    updatedby: string;
    activeflag: boolean;
  };
  
  export type SaleType = {
    saleId: string;
    productId: string;
    productName: string;
    quantitySold: string;
    totalPrice: number;
    totalProfit: number;
   salesDate: string;
    activeflag: boolean;
  };
  
  export type APIResponse<T> = {
    message: string;
    status: number;
    data: T;
  };