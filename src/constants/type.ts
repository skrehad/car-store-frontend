export interface Car {
  _id: string; // MongoDB ObjectId as a string
  name: string;
  brand: string;
  model: string;
  category: string;
  description: string;
  image: string;
  availability: boolean;
  stock: number;
  year: number;
  price: number;
  __v: number;
}

export type CarData = {
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  category: string;
  description: string;
  stock: number;
  availability: boolean;
  image?: string;
  userName: string;
  userEmail: string;
};

interface UserInfo {
  name: string;
  email: string;
  role: string; // e.g., 'user', 'admin', etc.
  iat: number; // Issued at (timestamp)
  exp: number; // Expiry timestamp
}

export interface TOrder {
  _id: string;
  product: Car;
  paidStatus: boolean;
  OrderStatus: boolean;
  transactionId: string;
  userInfo: UserInfo;
}

export interface User {
  role: "admin" | "user";
  name: string;
  email: string;
}

export interface CarFormData {
  name: string;
  brand: string;
  model: string;
  stock: number;
  description: string;
  image: FileList;
  price: number;
  category: string;
}
