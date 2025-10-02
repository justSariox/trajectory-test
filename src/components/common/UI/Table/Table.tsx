import { Table as AntTable } from 'antd';
import type { TableProps as AntTableProps } from 'antd';
import './Table.css';

export function Table<T extends Record<string, any>>({
                                                         className = '',
                                                         pagination = {
                                                             pageSize: 10,
                                                         },
                                                         ...props
                                                     }: AntTableProps<T>) {
    return (
        <AntTable<T>
            {...props}
            className={`custom-table ${className}`}
            pagination={pagination}
        />
    );
}