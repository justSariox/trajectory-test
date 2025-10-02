import type { Vehicle } from '../types/vehicle';

const BASE_URL = 'https://ofc-test-01.tspb.su/test-task';

export const fetchVehicles = async (): Promise<Vehicle[]> => {
    const response = await fetch(`${BASE_URL}/vehicles`);
    if (!response.ok) throw new Error('Не удалось загрузить данные об автомобилях');
    return response.json();
};