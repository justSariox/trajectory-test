import { Button, Popconfirm } from 'antd';

import type { Vehicle } from "../../../types/vehicle.ts";
import type { ColumnsType } from 'antd/es/table';

import { useVehicles } from "@hooks/useVehicles";
import { useVehicleActions } from "@hooks/useVehicleActions";
import { DragHandle, Table } from "@components/common";
import { formatPrice } from "@utils/formatters";
import { ColorIndicator } from "@components/Vehicle";

import './VehicleTable.css';

interface VehicleTableProps {
    onEdit: (vehicle: Vehicle) => void;
}

export const VehicleTable = ({ onEdit }: VehicleTableProps) => {
    const { vehicles } = useVehicles();
    const { removeVehicle } = useVehicleActions();

    const columns: ColumnsType<Vehicle> = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <DragHandle vehicle={{ id: record.id, color: record.color }}>
                    {text}
                </DragHandle>
            ),
        },
        { title: 'Модель', dataIndex: 'model', key: 'model' },
        {
            title: 'Год',
            dataIndex: 'year',
            key: 'year',
            sorter: (a, b) => a.year - b.year,
        },
        {
            title: 'Цена',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            render: (value: number) => formatPrice(value),
        },
        {
            title: 'Цвет',
            key: 'color',
            render: (_, record) => <ColorIndicator color={record.color} />,
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_, record) => (
                <div className="vehicle-actions">
                    <Button
                        type="link"
                        onClick={() => onEdit(record)}
                        className="action-btn edit-btn"
                    >
                        ✏️ Редактировать
                    </Button>
                    <Popconfirm
                        title="Вы уверены, что хотите удалить этот автомобиль?"
                        onConfirm={() => removeVehicle(record.id)}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button
                            type="link"
                            danger
                            className="action-btn delete-btn"
                        >
                            🗑️ Удалить
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <Table<Vehicle>
            dataSource={vehicles}
            columns={columns}
            rowKey="id"
        />
    );
};