import { ButtonHTMLAttributes, FC, ForwardedRef, forwardRef, memo, ReactNode } from "react";
import loadingSVG from "assets/loading.svg";

type size = "default" | "narrow";
type color = "primary" | "accent" | "secondary";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	forwardedRef?: ForwardedRef<HTMLButtonElement>;
	className?: string;
	children?: ReactNode;
	loading?: boolean;
	size?: size;
	color?: color;
	skeleton?: boolean;
}

export const Button: FC<IButtonProps> = ({
	forwardedRef,
	className = "",
	children = "",
	loading = false,
	color = "primary",
	size = "default",
	skeleton = false,
	...btnProps
}) => {
	return (
		<button
			ref={forwardedRef}
			className={[
				"flex items-center justify-center whitespace-nowrap disabled:opacity-50 disabled:bg-card enabled:hover:bg-card transition-all border-[3px]",
				className,
				size === "default" ? "px-4 py-2" : "",
				size === "narrow" ? "p-2" : "",
				color === "primary"
					? "bg-primary border-primary text-background hover:border-primary disabled:border-primary"
					: "",
				color === "accent"
					? "bg-accent border-accent text-card hover:text-accent hover:border-accent disabled:border-accent"
					: "",
				color === "secondary"
					? "bg-secondary border-secondary text-card hover:text-secondary hover:border-secondary disabled:border-secondary"
					: "",
				skeleton ? "!bg-transparent !text-primary hover:!text-background hover:!bg-primary" : "",
			].join(" ")}
			{...btnProps}
		>
			{!loading && <h4>{children}</h4>}
			{loading !== undefined && (
				<img style={{ display: loading ? "block" : "none" }} width={24} height={24} src={loadingSVG} alt="" />
			)}
		</button>
	);
};

export default memo(
	forwardRef(({ children, ...props }: IButtonProps, ref: ForwardedRef<HTMLButtonElement>) => (
		<Button {...props} forwardedRef={ref}>
			{children}
		</Button>
	))
);
