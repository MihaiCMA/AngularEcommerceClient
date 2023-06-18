import { Product } from "./product";
import { ProductType } from "./productType";

export class ProductVariant {
    product: Product | null = null;
    productId: number = 0;
    productType: ProductType | null = null;
    productTypeId: number = 0;
    price: number = 0;
    originalPrice: number = 0;
    visible: boolean = true;
    deleted: boolean = false;
    editing: boolean = false;
    isNew: boolean = false;
  }