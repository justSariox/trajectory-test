import { create } from 'zustand';
import type { Vehicle, VehicleCoordinates, VehicleCreateData, VehicleUpdateData } from '../types/vehicle';
import { fetchVehicles } from "@api/vehicleApi";

interface VehicleState {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
  fetchVehicles: () => Promise<void>;
  addVehicle: (data: VehicleCreateData) => void;
  updateVehicle: (id: number, data: VehicleUpdateData) => void;
  removeVehicle: (id: number) => void;
  updateVehicleCoordinates: (data: VehicleCoordinates) => void;
}

export const useVehicleStore = create<VehicleState>((set, get) => ({
  vehicles: [],
  loading: false,
  error: null,

  fetchVehicles: async () => {
    set({ loading: true, error: null });
    try {
      const vehicles = await fetchVehicles();
      set({ vehicles, loading: false });
    } catch (error) {
      set({ error: 'Ошибка загрузки данных: ' + (error as Error).message, loading: false });
    }
  },

  addVehicle: (data) => {
    const { vehicles } = get();
    const newId = Math.max(0, ...vehicles.map(v => v.id)) + 1;
    const newVehicle: Vehicle = { ...data, id: newId };
    set({ vehicles: [...vehicles, newVehicle] });
  },

  updateVehicle: (id, data) => {
    const { vehicles } = get();
    set({
      vehicles: vehicles.map(vehicle =>
          vehicle.id === id ? { ...vehicle, ...data } : vehicle
      )
    });
  },

  removeVehicle: (id) => {
    const { vehicles } = get();
    set({ vehicles: vehicles.filter(vehicle => vehicle.id !== id) });
  },

  updateVehicleCoordinates: ({ id, latitude, longitude }) => {
    const { vehicles } = get();
    set({
      vehicles: vehicles.map(vehicle =>
          vehicle.id === id ? { ...vehicle, latitude, longitude } : vehicle
      )
    });
  },
}));