// Auth type definitions
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin' | 'manager';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
