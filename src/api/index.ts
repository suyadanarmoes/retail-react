import * as product from "./product";
import * as sale from "./sale";
import * as user from "./user";

class API {
  product: typeof product | undefined;
  sale: typeof sale | undefined;
  user: typeof user | undefined;

  constructor() {
    this.product = product;
    this.sale = sale;
    this.user = user;
  }
}

const api = new API();

export default api;