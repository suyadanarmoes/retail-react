export type SellProduct = {
    productId: string;
    productName:string;
    quantitySold: number;
  };
  
  export type GetAllSale = {
    saleId: string;
    productId: string;
    productName: string;
    quantitySold: string;
    totalPrice: number;
    totalProfit: number;
   salesDate: string;
    activeFlag: boolean;
  };
  
  export type SaleReport = {
    totalPrice: number;
    totalProfit: number;
  };
  
  // export type GetSaleSummary = {
  //   totalPrice: number;
  //   totalProfit: number;
  // };