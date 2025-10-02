export interface Vehicle {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  price: number;
  latitude?: number;
  longitude?: number;
}

export type VehicleCreateData = Omit<Vehicle, 'id'>;
export type VehicleUpdateData = Partial<Pick<Vehicle, 'name' | 'price'>>;
export type VehicleCoordinates = Pick<Vehicle, 'id' | 'latitude' | 'longitude'>;

export type VehicleKey = keyof Vehicle;