import { Category } from "./category";
import { ProductVariant } from "./productVariant";

export class Product {
    id: number = 0;
    title: string = '';
    description: string = '';
    imageUrl: string = '';
    category: Category | undefined;
    categoryId: number = 0;
    featured: boolean = false;
    variants: ProductVariant[] = [];
    visible: boolean = true;
    deleted: boolean = false;
    editing: boolean = false;
    isNew: boolean = false;
  }