import { useState, type DragEvent } from 'react';

export const useDragAndDrop = () => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = (e: DragEvent, data: any) => {
        e.dataTransfer.setData('application/json', JSON.stringify(data));
        e.dataTransfer.effectAllowed = 'copy';
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    return {
        isDragging,
        handleDragStart,
        handleDragEnd
    };
};