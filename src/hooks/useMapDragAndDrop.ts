import { useEffect, useRef } from 'react';
import L from 'leaflet';

interface UseMapDragAndDropProps {
    onDrop: (id: number, lat: number, lng: number) => void;
}

export const useMapDragAndDrop = ({ onDrop }: UseMapDragAndDropProps) => {
    const mapRef = useRef<L.Map | null>(null);

    useEffect(() => {
        const handleDragOver = (e: Event) => {
            const dragEvent = e as DragEvent;
            dragEvent.preventDefault();
            if (dragEvent.dataTransfer) {
                dragEvent.dataTransfer.dropEffect = 'copy';
            }
        };

        const handleDrop = (e: Event) => {
            const dragEvent = e as DragEvent;
            dragEvent.preventDefault();
            if (!dragEvent.dataTransfer || !mapRef.current) return;

            try {
                const mapElement = document.querySelector('.leaflet-container') as HTMLElement;
                if (!mapElement) return;

                const rect = mapElement.getBoundingClientRect();
                const x = dragEvent.clientX - rect.left;
                const y = dragEvent.clientY - rect.top;

                const point = L.point(x, y);
                const latlng = mapRef.current.containerPointToLatLng(point);

                const data = JSON.parse(dragEvent.dataTransfer.getData('application/json'));
                if (data && data.id) {
                    onDrop(data.id, latlng.lat, latlng.lng);
                }
            } catch (error) {
                console.error('Ошибка при обработке перетаскивания:', error);
            }
        };

        document.addEventListener('dragover', handleDragOver);
        document.addEventListener('drop', handleDrop);

        return () => {
            document.removeEventListener('dragover', handleDragOver);
            document.removeEventListener('drop', handleDrop);
        };
    }, [onDrop]);

    return {
        setMap: (map: L.Map) => {
            mapRef.current = map;
        }
    };
};