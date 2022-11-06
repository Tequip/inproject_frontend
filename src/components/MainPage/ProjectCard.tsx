import Icon from "components/ui/Icon";
import Image from "components/ui/Image";
import ShortText from "components/ui/ShortText";
import Tag from "components/ui/Tag";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Category } from "types";

export interface ProjectCardProps {
	id: number;
	imageURL: string;
	categories: Category[];
	title: string;
	desc: string;
	likesCount: number;
	dateISO: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ id, imageURL, dateISO, likesCount, categories, title, desc }) => {
	const navigate = useNavigate();
	const [hover, setHover] = useState(false);

	const onClick = () => {
		id && navigate(`project/${id}`);
	};

	return (
		<button
			onClick={onClick}
			onMouseOver={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			className="relative flex flex-col gap-2 border-2 border-primary h-[500px] w-[320px] bg-background cursor-pointer"
		>
			<div className="relative w-full">
				<Image height={240} src={imageURL} />
				<div className="absolute bottom-0 w-full flex justify-between">
					<div className="text-background flex items-center gap-1 p-1">
						<Icon name="heart" color="var(--color-background)" />
						<span className="font-bold">{likesCount}</span>
					</div>
					<div className="flex gap-1">
						{categories.map((category) => (
							<Tag id={category.id} text={category.name} key={category.id} uppercase />
						))}
					</div>
				</div>
			</div>
			<div className="flex flex-col items-start gap-2 p-2 mb-auto">
				<span className="text-left text-2xl font-bold">
					<ShortText limit={40}>{title}</ShortText> 
				</span>
				<time>{new Date(dateISO).toLocaleDateString()}</time>
				 <ShortText limit={120}>{desc}</ShortText>
			</div>
			<div
				className={["top-0 left-0 w-full h-full absolute bg-neutral-200/40", hover ? "block" : "hidden"].join(" ")}
			></div>
		</button>
	);
};

export default ProjectCard;
