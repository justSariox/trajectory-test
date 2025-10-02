import {useEffect} from "react";

import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';

import { useVehicles } from "@hooks/useVehicles";
import { useVehicleActions } from "@hooks/useVehicleActions";
import { useMarkerDrag } from "@hooks/useMarkerDrag";
import { createVehicleIcon } from "@utils/vehicleIcons";
import { useMapDragAndDrop } from "@hooks/useMapDragAndDrop";

import { MAP_CONSTANTS } from "@utils/constants";
import './VehicleMap.css';

const DraggableMarkers = () => {
    const { vehicles } = useVehicles();
    const { updateVehicleCoordinates } = useVehicleActions();
    const { handleDragStart, handleDragEnd } = useMarkerDrag();

    const vehiclesWithCoords = vehicles.filter(v =>
        typeof v.latitude === 'number' && typeof v.longitude === 'number'
    );

    const handleMarkerDragEnd = (vehicleId: number, event: any) => {
        const { lat, lng } = event.target.getLatLng();
        updateVehicleCoordinates(vehicleId, lat, lng);
        handleDragEnd();
    };

    return (
        <>
            {vehiclesWithCoords.map(vehicle => (
                <Marker
                    key={vehicle.id}
                    position={[vehicle.latitude!, vehicle.longitude!]}
                    icon={createVehicleIcon(vehicle.color)}
                    draggable
                    eventHandlers={{
                        dragstart: handleDragStart,
                        dragend: (e) => handleMarkerDragEnd(vehicle.id, e),
                    }}
                >
                    <Popup>
                        <div className="vehicle-popup">
                            <strong>{vehicle.name} {vehicle.model}</strong>
                            <br />Год: {vehicle.year}
                            <br />Цена: ${vehicle.price.toLocaleString()}
                            <br />Цвет: <span style={{ color: vehicle.color }}>■</span> {vehicle.color}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </>
    );
};

const MapController: React.FC = () => {
    const { updateVehicleCoordinates } = useVehicleActions();
    const { setMap } = useMapDragAndDrop({
        onDrop: updateVehicleCoordinates
    });

    const map = useMapEvents({});

    useEffect(() => {
        setMap(map);
    }, [map, setMap]);

    return null;
};

export const VehicleMap: React.FC = () => {
    const { vehicles } = useVehicles();

    const vehiclesWithCoords = vehicles.filter(v =>
        typeof v.latitude === 'number' && typeof v.longitude === 'number'
    );

    const center = vehiclesWithCoords[0]
        ? [vehiclesWithCoords[0].latitude!, vehiclesWithCoords[0].longitude!] as [number, number]
        : MAP_CONSTANTS.DEFAULT_CENTER;

    return (
        <div className="vehicle-map-wrapper">
            <MapContainer
                center={center}
                zoom={MAP_CONSTANTS.DEFAULT_ZOOM}
                className="vehicle-map-container"
                scrollWheelZoom
            >
                <TileLayer
                    attribution={MAP_CONSTANTS.TILE_ATTRIBUTION}
                    url={MAP_CONSTANTS.TILE_URL}
                />
                <MapController />
                <DraggableMarkers />
            </MapContainer>
        </div>
    );
};