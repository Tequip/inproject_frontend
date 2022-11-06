import { ButtonHTMLAttributes, FC, memo } from "react";
import Icon, { IconProps } from "./Icon";

interface IconButtonProps
	extends IconProps,
		ButtonHTMLAttributes<HTMLButtonElement> {
	name: string;
	className?: string;
	isLoading?: boolean;
	onClick?: () => void;
}

const IconButton: FC<IconButtonProps> = ({
	onClick,
	isLoading = false,
	name,
	className = "",
	...iconProps
}) => {
	return (
		<button
			className={[
				"cursor-pointer p-1",
				isLoading ? "rotate-anim cursor-default" : "",
				className
			].join(" ")}
			onClick={onClick}
			disabled={isLoading}
			{...iconProps}
		>
			{<Icon name={isLoading ? "refresh" : name} {...iconProps} />}
		</button>
	);
};

export default memo(IconButton);
