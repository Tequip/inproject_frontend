import userAPI from "api/userAPI";
import Button from "components/ui/Button";
import Image from "components/ui/Image";
import SmallProjectList from "components/ui/SmallProjectList";
import Tabs from "components/ui/Tabs";
import Tag from "components/ui/Tag";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Interest, User, Project, Skill } from "types";
import avatarSvg from "assets/avatar.svg";
import { ISmallProjectCard } from "components/ui/SmallProjectCard";

interface UserPageProps {}

const UserPage: FC<UserPageProps> = ({}) => {
	const { id } = useParams();
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		userAPI.getUser(id ? +id : undefined).then((user) => setUser(user));
	}, [id]);

	return (
		<div className="wrapper py-8">
			<header className="flex items-start flex-col mb-4">
				<h2 className="text-primary mb-2">
					{user?.first_name} {user?.last_name}
				</h2>
				<p className="text-primary">{user?.status}</p>
			</header>
			<div className="flex gap-8 mb-4">
				<div className="text-left">
					<Image height={240} width={240} src={user?.photo || ""} defaultImg={avatarSvg} />
					<div className="mt-4 mb-2">Контакты:</div>
					<a href={user?.telegram} className="text-primary">
						{user?.telegram}
					</a>
					<span className="text-primary">{user?.email}</span>
				</div>
				<div className="flex flex-col gap-2">
					<h5 className="text-secondary text-left border-b-2 border-secondary">
						Желаемя роль{" "}
						<span className="text-text text-base">{user?.role ? user.role : "Не указана"}</span>
					</h5>
					<div className="flex flex-col gap-1 text-left">
						<span className="text-secondary">Интересы:</span>
						<div className="flex flex-wrap gap-1">
							{user?.interest.length
								? user?.interest.map((interest) => (
										<Tag id={interest.id} key={interest.id} text={interest.name} uppercase />
								  ))
								: "Не указаны"}
						</div>
					</div>
					<div className="flex flex-col gap-1 text-left">
						<span className="text-secondary">Навыки:</span>
						<div className="flex flex-wrap gap-1">
							{user?.skill.length
								? user?.skill.map((skill) => (
										<Tag id={skill.id} key={skill.id} text={skill.name} uppercase />
								  ))
								: "Не указаны"}
						</div>
					</div>
					<div className="text-left">
						<span className="text-secondary">О себе:</span>
						<p>{user?.about ? user?.about : "Не указано"}</p>
					</div>
				</div>
			</div>
			<footer className="flex flex-col items-center justify-center gap-4">
				<Tabs headers={["Участник проектов", "Создатель проектов"]}>
					<SmallProjectList key={"project_member"} data={user?.project_member} />
					<SmallProjectList key={"project_creator"} data={user?.project_creator} />
				</Tabs>
				<Tabs headers={["Рекомендуемые для участия проекты"]}>
					<SmallProjectList key={"project_liked"} data={user?.project_liked} />
				</Tabs>
				<Button className="mt-6" size="narrow">
					Пригласить в проект
				</Button>
			</footer>
		</div>
	);
};

export default UserPage;
