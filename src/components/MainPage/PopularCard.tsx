import Icon from "components/ui/Icon";
import Image from "components/ui/Image";
import ShortText from "components/ui/ShortText";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Location } from "types";

export interface PopularCardProps {
	id: number;
	title: string;
	desc: string;
	dateISO: string;
	imgUrl: string;
	locations: Location[];
	size?: "default" | "big";
	vertical?: boolean;
	className?: string;
}

const PopularCard: FC<PopularCardProps> = ({
	id,
	title,
	desc,
	dateISO,
	imgUrl,
	locations,
	size = "default",
	vertical = false,
	className = ''
}) => {
	const navigate = useNavigate();

	const onClick = () => {
		id && navigate(`project/${id}`);
	};

	return (
		<div
			onClick={onClick}
			className={[
				"flex gap-2 text-card cursor-pointer border-2 border-transparent hover:border-neutral transition-all",
				vertical ? "flex-col" : "h-[200px] overflow-hidden",
				className
			].join(" ")}
		>
			{size === "big" ? <Image height={412} src={imgUrl} /> : <Image height={200} width={250} src={imgUrl} />}
			<div className={["flex flex-col p-1 flex-1 text-background", vertical ? "" : "justify-between"].join(" ")}>
				{size === "big" ? (
					<h3 className="mb-2">
						<ShortText limit={40}>{title}</ShortText>
					</h3>
				) : (
					<h5 className="mb-2">
						<ShortText limit={40}>{title}</ShortText>
					</h5>
				)}
				<ShortText limit={vertical ? 300 : 200} className="mb-4">
					{desc}
				</ShortText>
				<div className="flex justify-between items-center flex-wrap mt-auto">
					<div className="flex items-center gap-1">
						<Icon name="location" color="var(--color-background)" />
						{locations.map((location) => (
							<span key={location.id}>{location.name}</span>
						))}
					</div>
					<time>{new Date(dateISO).toLocaleDateString()}</time>
				</div>
			</div>
		</div>
	);
};

export default PopularCard;
