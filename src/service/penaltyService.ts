import { IPenalty, IPenaltyCreate, IPenaltyUpdate } from "@/types/penalty";
import { get, patch, post, put } from "./api";

export const penaltyService = {
  createPenalty: (penaltyData: IPenaltyCreate) => post<IPenalty>("/penalty", penaltyData),
  getAll: () => get<IPenalty[]>("/penalty"),
  getAllFromLoggedUserPenalty: () => get<IPenalty[]>("/penalty/my"),
  getPenaltyById: (id: string) => get<IPenalty>(`/penalty/${id}`),
  updatePenalty: (id: string, penaltyData: IPenaltyUpdate) => put(`/penalty/${id}`, penaltyData),
  getPenaltiesByUser: (userId: string) => get<IPenalty[]>(`/penalty/user/${userId}`),
  getActivePenaltiesByUser: (userId: string) => get<IPenalty[]>(`/penalty/user/${userId}/active`),
};