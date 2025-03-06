import { IUser, IUserCreate } from "@/types/user";
import { get, patch, post, put } from "./api";

export const userService = {
  createUser: (userData: IUserCreate) => post<IUser>("/user", userData),
  getAll: () => get<IUser[]>("/user"),
  getActiveUsers: () => get<IUser[]>("/user/active"),
  getInactiveUsers: () => get<IUser[]>("/user/inactive"),
  getById: (id: string) => get<IUser>(`/user/${id}`),
  updateUser: (id: string, userData: IUserCreate) =>
    put("/user/" + id, userData),
  getByEmail: (email: string) => get<IUser>(`/user/email/${email}`),
  searchByName: (name: string) => get<IUser[]>(`/user/search/${name}`),
  getByType: (type: string) => get<IUser[]>(`/user/type/${type}`),
  activateUser: (id: string) => patch(`/user/activate/${id}`, {}),
  deactivateUser: (id: string) => patch(`/user/deactivate/${id}`, {}),
};
