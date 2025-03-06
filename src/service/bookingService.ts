import { IBooking, IBookingCreate, IBookingUpdate } from "@/types/booking";
import { del, get, patch, post, put } from "./api";

export const bookingService = {
  createBooking: (bookingData: IBookingCreate) =>
    post<IBooking>("/booking", bookingData),
  getAll: () => get<IBooking[]>("/booking"),
  getAllFromLoggedUser: () => get<IBooking[]>(`/booking/my`),
  getByStatus: (status: string) => get<IBooking[]>(`/booking/status/${status}`),
  getByShift: (shift: string) => get<IBooking[]>(`/booking/shift/${shift}`),
  getByUser: (userId: string) => get<IBooking[]>(`/booking/user/${userId}`),
  getByResource: (resourceId: number) =>
    get<IBooking[]>(`/booking/resource/${resourceId}`),
  getByDate: (date: string) => get<IBooking[]>(`/booking/date/${date}`),
  updateStatus: (id: number, status: string) =>
    patch(`/booking/status/${id}`, { status }),
  update: (id: number, bookingData: IBookingUpdate) =>
    put(`/booking/${id}`, bookingData),
  delete: (id: number) => del(`/booking/${id}`),
};
