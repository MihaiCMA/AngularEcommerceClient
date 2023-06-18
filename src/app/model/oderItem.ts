import { Order } from "./order";
import { Product } from "./product";
import { ProductType } from "./productType";

export class OrderItem {
    order: Order = new Order();
    orderId: number = 0;
    product: Product = new Product();
    productId: number = 0;
    productType: ProductType = new ProductType();
    productTypeId: number = 0;
    quantity: number = 0;
    totalPrice: number = 0;
  }
  