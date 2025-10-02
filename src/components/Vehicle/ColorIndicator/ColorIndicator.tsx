import './ColorIndicator.css';

interface ColorIndicatorProps {
    color: string;
    size?: number;
    withBorder?: boolean;
}

export const ColorIndicator= ({
                                                                  color,
                                                                  size = 24,
                                                                  withBorder = true
                                                              }: ColorIndicatorProps) => {
    return (
        <div
            className={`color-indicator ${withBorder ? 'with-border' : ''}`}
            style={{
                backgroundColor: color,
                width: size,
                height: size,
            }}
            title={color}
        />
    );
};