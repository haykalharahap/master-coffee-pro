export interface CoffeeItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Hot' | 'Cold' | 'Specialty';
  image: string;
}

export interface User {
  username: string;
  email: string;
  isAuthenticated: boolean;
  token?: string;
}

export interface ReqresUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ReqresListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ReqresUser[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum AuthMode {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER'
}

// Fix: Exporting LoginStatus enum used in components/LoginModal.tsx
export enum LoginStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
