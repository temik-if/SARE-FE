export interface IUser {
  id: string;
  email: string;
  profile_picture?: string;
  first_name: string;
  last_name: string;
  full_name: string;
  is_active: boolean;
  type: "TEACHER" | "COORDINATOR";
  createdAt: string;
  updatedAt: string;
  penalties?: number;
}

export interface IUserCreate {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  type: "TEACHER" | "COORDINATOR";
}

export interface UserUpdate {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  type?: "TEACHER" | "COORDINATOR";
}

export interface UserUpdateResponse {
  createdAt: string;
  email: string;
  first_name: string;
  full_name: string;
  id: string;
  is_active: boolean;
  last_name: string;
  type: string;
  updatedAt: string;
}