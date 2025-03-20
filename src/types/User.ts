export interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    email?: string;
    image?: string;
  }
  
  export interface LoginResponse {
    token: string;
    user: User;
  }