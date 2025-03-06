import { get, post, put, del, patch } from "./api";
import { IResource, IResourceCreate, IResourceUpdate } from "@/types/resource";

export const resourceService = {
  createResource: (resourceData: IResourceCreate) =>
    post<IResource>("/resource", resourceData),
  getAll: () => get<IResource[]>("/resource"),
  getAvailable: (date: string, shift: string, lesson: string) =>
    get<IResource[]>("/resource/available", {
      params: { date, shift, lesson },
    }),
  getAllEquipment: () => get<IResource[]>("/resource/equipment"),
  getAllRooms: () => get<IResource[]>("/resource/room"),
  getById: (id: string) => get<IResource>(`/resource/${id}`),
  updateResource: (id: string, resourceData: IResourceUpdate) =>
    put<IResource>(`/resource/${id}`, resourceData),
  deleteResource: (id: string) => del<IResource>(`/resource/${id}`),
  getByName: (name: string) => get<IResource>(`/resource/${name}`),
  getEquipmentByModel: (model: string) =>
    get<IResource>(`/resource/equipment/${model}`),
  getEquipmentByBrand: (brand: string) =>
    get<IResource>(`/resource/equipment/${brand}`),
  getEquipmentBySerialNumber: (serialNumber: string) =>
    get<IResource>(`/resource/equipment/${serialNumber}`),
  updateResourceStatus: (id: string, status: string) =>
    patch<IResource>(`/resource/${id}/status`, { status }),
};
