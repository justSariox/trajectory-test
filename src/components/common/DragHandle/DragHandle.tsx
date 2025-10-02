import React from 'react';
import { useDragAndDrop } from '@hooks/useDragAndDrop';
import './DragHandle.css';

interface DragHandleProps {
    vehicle: { id: number; color: string };
    children: React.ReactNode;
}

export const DragHandle: React.FC<DragHandleProps> = ({ vehicle, children }) => {
    const { handleDragStart, handleDragEnd } = useDragAndDrop();

    return (
        <div
            className="drag-handle"
            draggable
            onDragStart={(e) => handleDragStart(e, vehicle)}
            onDragEnd={handleDragEnd}
        >
            {children}
        </div>
    );
};