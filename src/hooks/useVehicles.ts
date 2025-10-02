import { useVehicleStore } from "@store/vehicleStore";

export const useVehicles = () => {
    const { vehicles, loading, error, fetchVehicles } = useVehicleStore();

    return {
        vehicles,
        loading,
        error,
        fetchVehicles
    };
};