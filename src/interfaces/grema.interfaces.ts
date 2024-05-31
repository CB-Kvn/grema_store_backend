

export interface Users {
  id: string;
  name: string;
  lastName: string;
  cellphone: string;
  genre: string;
  profile: {
    email: string;
    password: string;
    address: string;
    image: string
  }

}

export interface UsersUpdate {
  id: string;
  phone: string;
  address: string;

}
export interface Categories {
  name: string
}



export interface ProfilePassword {
  id: string;
  email: string;
  password: string;
}

export interface LoginProcess {
  email: string;
  password: string;
  passordNew?: string;
}

export interface ResponseApi {
  success?: string | undefined;
  status?: number;
  msg?: string;
  data?: Object | undefined;
  info?: string | undefined;
  error?: string | undefined;
  validate?: boolean | undefined;
}

export enum KeysToValidateUserCreate {
  id = "id",
  name = "name",
  lastName = "lastName",
  cellphone = "cellphone",
  genre = "genre",
  email = "email",
  password = "password",
  address = "address",
}
export enum KeysToValidateProfilePassword {
  id = "id",
  email = "email",
  password = "password",
}
export enum KeysToValidateProfileLogin {
  email = "email",
  password = "password",
}

export interface EntriesGenerateToken {
  userId: number | string;
  email: string;
}

export interface DecodeReponseJwt {
  userId: number | string;
  email: string;
  password: string;
  iat: number;
  exp: number;
}


export interface ProductInventory {
  quantity: number;
  image: string[];
  price: number;
  status: boolean;
  desc: number;
  typeDesc: string;
  createAtProductInventory: Date;
  updateAtProductInventory: Date;
}

export interface Product {
  name: string;
  description: string;
  material: string;
  size: string;
  shape: string;
  categoryId: string; // or whatever type categoryId is
  color: string;
  createAtProduct: Date;
  updateAtProduct: Date;
  inventory: ProductInventory; // Nested object
}
export interface Favorities_Cart {
  id: string
  userId: string
  productId: string
  type: string
  quantyOrder: number
  status: boolean
}

export interface RemoveFav_Car {
  id: string

}

export interface MailInterface {
  from?: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  text?: string;
  html: string;
}

export interface DeleteUser {
  id: string,
  email: string
}

export interface Orders {
  invoiceNumber:   string,
  amount:          number
  userId:          string,
  tax:             number,
  shipping:        number,
  details:         InvoiceDetail[],
  pdf:             string,
  status:             string,
  createAtInvoice: string,
  updateAtInvoice: string
}

export interface InvoiceDetail {
  id:                      string,
  invoiceId:               string, 
  quantity:                number,
  price:                   number,
  status:                  string,
  createAtInvoiceDetail:   string,
  updateAtInvoiceDetail:   string
}