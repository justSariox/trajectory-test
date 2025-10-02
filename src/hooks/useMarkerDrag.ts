export const useMarkerDrag = () => {
    const handleDragStart = () => {
        const map = document.querySelector('.leaflet-container') as HTMLElement;
        if (map) {
            map.style.pointerEvents = 'none';
        }
    };

    const handleDragEnd = () => {
        const map = document.querySelector('.leaflet-container') as HTMLElement;
        if (map) {
            map.style.pointerEvents = 'auto';
        }
    };

    return {
        handleDragStart,
        handleDragEnd
    };
};