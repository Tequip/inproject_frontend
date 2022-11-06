import Tag from "components/ui/Tag";
import { FC, useState } from "react";
import { Tag as ITag } from "types";

interface TagContainerProps {
	data: ITag[];
	setData: (data: ITag[]) => void;
	label?: string;
}

const TagContainer: FC<TagContainerProps> = ({ label, data, setData }) => {
	const [input, setInput] = useState("");

	const onEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== "Enter") return;
		event.preventDefault();

		setData([...data, { id: Math.random(), name: event.currentTarget.value }]);
		setInput("");
	};

	const onTagRemove = (id: number) => {
		setData(data.filter((tag) => tag.id !== id));
	};

	return (
		<div className="w-full">
			{label && <label className="text-secondary text-left block">{label}</label>}
			<div className="min-h-[48px] flex flex-wrap items-stretch justify-start border-2 border-secondary">
				{data.map((tag) => (
					<Tag
						className="m-2"
						id={tag.id}
						text={tag.name}
						key={tag.id}
						uppercase
						removable
						onRemove={onTagRemove}
					/>
				))}
				<input
					className="flex-1 p-2 outline-none"
					value={input}
					onChange={(event) => setInput(event.target.value)}
					type="text"
					onKeyDown={onEnterPress}
				/>
			</div>
		</div>
	);
};

export default TagContainer;
