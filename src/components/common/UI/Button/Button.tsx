import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';
import './Button.css';

interface CustomButtonProps extends Omit<AntButtonProps, 'type'> {
    appearance?: 'primary' | 'secondary' | 'danger';
    withIcon?: boolean;
}

export const Button = ({
                                                        children,
                                                        appearance = 'primary',
                                                        withIcon = false,
                                                        className = '',
                                                        ...props
                                                    }: CustomButtonProps) => {
    return (
        <AntButton
            {...props}
            className={`custom-button custom-button-${appearance} ${withIcon ? 'with-icon' : ''} ${className}`}
        >
            {children}
        </AntButton>
    );
};