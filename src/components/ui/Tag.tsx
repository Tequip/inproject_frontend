import { FC, useState } from "react";
import IconButton from "./IconButton";

interface TagProps {
	id?: number;
	text: string;
	className?: string;
	uppercase?: boolean;
	removable?: boolean;
	editable?: boolean;
	onRemove?: (id: number) => void;
	onChange?: (value: string) => void;
}

const Tag: FC<TagProps> = ({ id, className = "", text, uppercase, removable, onRemove, onChange, editable }) => {
	const [edit, setEdit] = useState(false);

	return (
		<div
			key={id}
			className={[
				className,
				"flex items-center justify-between select-none text-background bg-secondary px-2 py-1",
				uppercase ? "uppercase" : "",
				removable ? "pr-0" : "",
			].join(" ")}
		>
			{editable ? (
				<input className="bg-secondary" value={text} onChange={(event) => onChange && onChange(event.target.value)} type="text" />
			) : (
				<span>{text}</span>
			)}
			{removable && (
				<IconButton
					onClick={() => onRemove && id && onRemove(id)}
					name="close"
					color="var(--color-background)"
				/>
			)}
		</div>
	);
};

export default Tag;
