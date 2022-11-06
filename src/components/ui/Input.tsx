import { ChangeEvent, FC, ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	forwardedRef?: ForwardedRef<HTMLInputElement>;
	label?: string;
	value?: string;
	full?: boolean;
	multiline?: boolean;
	className?: string;
	change?: (val: string) => void;
	height?: number;
}

const Input: FC<InputProps> = ({
	className = "",
	forwardedRef,
	label,
	value = "",
	full,
	multiline,
	change,
	height,
	placeholder,
	...otherProps
}) => {
	return (
		<div className={["flex flex-col items-start", full ? "w-full" : "", className].join(" ")}>
			{label && (
				<label className="text-secondary" htmlFor={label}>
					{label}
				</label>
			)}
			{!multiline ? (
				<input
					ref={forwardedRef}
					id={label}
					type="text"
					className={[
						"p-1 h-[28px] min-w-[400px] max-w-[400px] border-secondary border-2 w-full",
						full ? "min-w-0 max-w-none" : "",
						multiline ? "h-[140px]" : "",
					].join(" ")}
					placeholder={placeholder}
					{...otherProps}
				/>
			) : (
				<textarea
					className={[
						"p-1 h-[140px] max-w-[400px] border-secondary border-2 w-full",
						full ? "min-w-full" : "",
					].join(" ")}
					style={{
						height: height + "px",
					}}
					value={value}
					onChange={(event) => change && change(event.target.value)}
					placeholder={placeholder}
				/>
			)}
		</div>
	);
};

export default forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => (
	<Input forwardedRef={ref} {...props} />
));
