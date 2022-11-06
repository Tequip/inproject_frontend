import { FC, InputHTMLAttributes, useMemo } from "react";

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	value?: string;
	setValue?: (date: string) => void;
}

const DatePicker: FC<DatePickerProps> = ({ label, value = "", setValue = () => {}, ...inputProps }) => {
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const dateISO = new Date(event.target.value).toISOString();
		setValue(dateISO);
	};

	const parsedValue = useMemo(() => {
		if (!value) {
			return ''
		}

		let yourDate = new Date(value);
		return yourDate.toISOString().split("T")[0];
	}, [value]);

	return (
		<div className="flex flex-col items-start">
			<label className="text-secondary" htmlFor={label}>
				{label}
			</label>
			<input
				id={label}
				type="date"
				className="h-[28px] max-w-[200px] border-secondary border-2 w-full"
				value={parsedValue}
				onChange={onChange}
				{...inputProps}
			/>
		</div>
	);
};

export default DatePicker;
