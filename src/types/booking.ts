export interface IBooking {
    id: number;
    user_id: string;
    resource_id: number;
    shift: "MORNING" | "AFTERNOON" | "EVENING";
    date: string;
    class: number[];
    status: string;
}

export interface IBookingCreate { 
    resource_id: number;
    shift: "MORNING" | "AFTERNOON" | "EVENING";
    date: string;
    class: number[]
}

export interface IBookingUpdate {
  id?: number;
  user_id?: string;
  resource_id?: number;
  shift?: "MORNING" | "AFTERNOON" | "EVENING";
  date?: string;
  class?: number[];
  status: string;
}
