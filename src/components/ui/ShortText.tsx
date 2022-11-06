import { FC } from "react";

interface ShortTextProps {
    children: string;
    className?: string;
    limit?: number;
}

const ShortText: FC<ShortTextProps> = ({
    children,
    className = "",
    limit = 150,
}) => {
    return (
        <div className={[className, "text-left"].join(" ")}>
            {children && children.length > limit
                ? children.slice(0, limit) + "..."
                : children}
        </div>
    );
};

export default ShortText;
