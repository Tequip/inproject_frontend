import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Image from "./Image";
import ShortText from "./ShortText";
import Tag from "./Tag";

export interface ISmallProjectCard {
	id: number;
	title: string;
	role: string;
	src: string;
}

const SmallProjectCard: FC<ISmallProjectCard> = ({ id, title, role, src }) => {
	const navigate = useNavigate();

	return (
		<button onClick={() => navigate(`/project/${id}`)} className="relative">
			<Tag id={0} className="absolute right-0 top-0" text={role} />
			<span className="absolute left-[20px] bottom-[20px]">
				<ShortText limit={30}>{title}</ShortText>
			</span>
			<Image width={240} height={160} src={src} />
		</button>
	);
};

export default SmallProjectCard;
