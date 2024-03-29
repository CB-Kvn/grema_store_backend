export interface Users {
  id: number;
  name: string;
  lastName: string;
  cellphone: string;
  genre: string;
  profile:{
    email: string;
    password: string;
    address: string;
    image: string
  }
  
}
export interface Catergories{
  name: string
  active: boolean
}

export interface ProfilePassword {
  id: number;
  email: string;
  password: string;
}

export interface LoginProcess {
  email: string;
  password: string;
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
  userId: number;
  email: string;
  password: string;
}

export interface DecodeReponseJwt {
  userId: number;
  email: string;
  password: string;
  iat: number;
  exp: number;
}
