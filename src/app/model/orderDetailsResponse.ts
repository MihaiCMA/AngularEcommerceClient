import { OrderDetailsProductResponse } from "./orderDetailsProductResponse";

export class OrderDetailsResponse {
    orderDate: Date = new Date();
    totalPrice: number = 0;
    products: OrderDetailsProductResponse[] = [];
  }
  