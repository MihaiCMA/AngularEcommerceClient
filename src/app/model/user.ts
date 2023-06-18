import { Address } from "./address";

export class User {
    id: number = 0;
    email: string = '';
    passwordHash: Uint8Array = new Uint8Array();
    passwordSalt: Uint8Array = new Uint8Array();
    dateCreated: Date = new Date();
    address: Address = new Address();
    role: string = 'Customer';
  }
  