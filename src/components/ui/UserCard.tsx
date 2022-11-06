import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Image from "./Image";

interface UserCardProps {
	id?: number | null;
	firstName: string;
	lastName: string;
	role: string;
	img: string;
}

const UserCard: FC<UserCardProps> = ({ id, firstName, lastName, role, img }) => {
	const navigate = useNavigate();

	return (
		<button onClick={() => navigate(`/user/${id}`)} className="flex flex-col items-start">
			<div className="relative">
				<span className="absolute top-0 right-0 bg-secondary p-1">{role}</span>
				<Image width={100} height={100} src={img} />
			</div>
			<span>{firstName}</span>
			<span>{lastName}</span>
		</button>
	);
};

export default UserCard;
