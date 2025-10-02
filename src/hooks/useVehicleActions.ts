import { useVehicleStore } from "@store/vehicleStore";
import type { VehicleCreateData, VehicleUpdateData } from '../types/vehicle';

export const useVehicleActions = () => {
    const { addVehicle, updateVehicle, removeVehicle, updateVehicleCoordinates } = useVehicleStore();

    return {
        addVehicle: (data: VehicleCreateData) => addVehicle(data),
        updateVehicle: (id: number, data: VehicleUpdateData) => updateVehicle(id, data),
        removeVehicle: (id: number) => removeVehicle(id),
        updateVehicleCoordinates: (id: number, latitude: number, longitude: number) =>
            updateVehicleCoordinates({ id, latitude, longitude })
    };
};