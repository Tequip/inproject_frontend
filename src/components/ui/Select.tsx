import { FC } from "react";
import ReactSelect, { ActionMeta } from "react-select";

export interface Option {
	label: string;
	value: string | number;
}

interface SelectProps {
	width?: number;
	placeholder?: string;
	value?: any;
	onChange?: (newValue: any) => void;
	options: any[];
	multi?: boolean;
	label?: string;
	full?: boolean;
}

const Select: FC<SelectProps> = ({
	label = "",
	width = 200,
	placeholder,
	value,
	onChange,
	options,
	multi = false,
	full = false,
}) => {
	const customStyles = {
		menu: (base: any, state: any) => ({
			...base,
			// width: state.selectProps.width,
			borderBottom: "1px dotted pink",
			color: state.selectProps.menuColor,
			padding: 20,
			borderRadius: 0,
			minWidth: 250,
			textAlign: "left",
		}),
		control: (base: any, state: any) => ({
			...base,
			background: "var(--color-background)",
			// Overwrittes the different states of border
			borderColor: "var(--color-secondary)",
			borderWidth: 2,
			borderRadius: 0,
			cursor: "pointer",
			// Removes weird border around container
			boxShadow: state.isFocused ? null : null,
			"&:hover": {
				// Overwrittes the different states of border
				borderColor: state.isFocused ? "var(--color-primary)" : "var(--color-secondary)",
			},
			minWidth: 250,
			textAlign: "left",
		}),
	};

	const mapOptions = (data: any) => {
		if (!data) return [];

		data = Array.isArray(data) ? data : [data];
		return data.map((obj: { id: number; name: string }) => {
			return {
				label: obj.name,
				value: obj.id,
			};
		});
	};

	const remapOptions = (options: Option[]) => {
		options = Array.isArray(options) ? options : [options];
		return options.map((option) => {
			return {
				id: option.value,
				name: option.label,
			};
		});
	};

	return (
		<div className={["flex items-start flex-col", full ? "items-stretch w-full" : ""].join(" ")}>
			{label && <label className="text-secondary text-left">{label}</label>}
			<ReactSelect
				styles={customStyles}
				placeholder={placeholder}
				isSearchable
				value={mapOptions(value)}
				onChange={(data) => onChange && onChange(remapOptions(data))}
				options={mapOptions(options)}
				isMulti={multi}
			/>
		</div>
	);
};

export default Select;
