import { Modal as AntModal } from 'antd';
import type { ModalProps as AntModalProps } from 'antd';
import './Modal.css';

interface CustomModalProps extends AntModalProps {}

export const Modal = ({
                                                      children,
                                                      className = '',
                                                      okButtonProps,
                                                      cancelButtonProps,
                                                      ...props
                                                  }: CustomModalProps) => {
    return (
        <AntModal
            {...props}
            className={`custom-modal ${className}`}
            okButtonProps={{
                ...okButtonProps,
                className: `custom-primary-btn ${okButtonProps?.className || ''}`
            }}
            cancelButtonProps={{
                ...cancelButtonProps,
                className: `custom-secondary-btn ${cancelButtonProps?.className || ''}`
            }}
        >
            {children}
        </AntModal>
    );
};