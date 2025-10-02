import L from 'leaflet';

export const createVehicleIcon = (color: string) => {
    return new L.DivIcon({
        html: `
      <div class="custom-vehicle-marker" style="background-color: ${color};">
        <div class="vehicle-icon">🚗</div>
      </div>
    `,
        className: 'vehicle-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
    });
};