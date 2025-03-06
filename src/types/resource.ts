export interface IEquipment {
  serial_number: string;
  model: string;
  brand: string;
}

export interface IRoom {
  capacity: number;
}

export interface IResource {
  id: number;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  equipment?: IEquipment;
  room?: IRoom;
}

export interface IResourceCreate {
  name: string;
  status: string;
  equipment?: IEquipment;
  room?: IRoom;
}

export interface IResourceUpdate {
  name?: string;
  status?: string;
  equipment?: IEquipment;
  room?: IRoom;
}
