import { type ReactNode } from 'react';
import { useDragAndDrop } from '@hooks/useDragAndDrop';
import './DragHandle.css';

interface DragHandleProps {
    vehicle: { id: number; color: string };
    children: ReactNode;
}

export const DragHandle = ({ vehicle, children }: DragHandleProps
) => {
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