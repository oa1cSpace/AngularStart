export interface User {
  id?: number;
  /*login?: string;  */               // ?!!
  name?: string;
  surname?: string;
  email: string;
  password: number | string;

  createdAt ? : string;
  updatedAt ? : string;
  token: string;
}


