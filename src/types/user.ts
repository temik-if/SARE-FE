export interface IUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  is_active: boolean;
  type: "TEACHER" | "COORDINATOR";
  createdAt: string;
  updatedAt: string;
}

export interface IUserCreate {
  firstName: string;
  lastName: string;
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