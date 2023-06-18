import { OrderItem } from "./oderItem";

export class Order {
    id: number = 0;
    userId: number = 0;
    orderDate: Date = new Date();
    totalPrice: number = 0;
    orderItems: OrderItem[] = [];
  }
  