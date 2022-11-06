import projectsAPI from "api/projectsAPI";
import Icon from "components/ui/Icon";
import { FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FullProject, Project } from "types";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import Tag from "components/ui/Tag";
import emailSvg from "assets/email.svg";
import Button from "components/ui/Button";
import Tabs from "components/ui/Tabs";
import UserCard from "components/ui/UserCard";
import Image from "components/ui/Image";
import SmallProjectList from "components/ui/SmallProjectList";
import ImageArrowSvg from "assets/img_arrow.svg";

interface ProjectPageProps {}

interface CTAbuttonProps {
	isProjectOwner?: boolean;
	isProjectMember?: boolean;
	className?: string;
}

const CTAbutton: FC<CTAbuttonProps> = ({ isProjectOwner, isProjectMember, className }) => {
	return (
		<Button className={className}>
			{
				<span>
					{isProjectOwner ? (
						"Редактировать"
					) : isProjectMember ? (
						"Покинуть проект"
					) : (
						<span>вступить в команду</span>
					)}
				</span>
			}
		</Button>
	);
};

const ProjectPage: FC<ProjectPageProps> = ({}) => {
	const { id } = useParams();
	const [project, setProject] = useState<FullProject | null>(null);

	const reactImageGalleryItems = useMemo(() => {
		return project?.images
			? project.images.map(
					(img: any) =>
						({
							original: img.url, //img
						} as ReactImageGalleryItem)
			  )
			: [];
	}, [project?.id]);

	useEffect(() => {
		id &&
			projectsAPI.getProject(+id).then((project) => {
				setProject(project);
			});
	}, [id]);

	return (
		<div className="wrapper text-card">
			<header className="flex items-center justify-between mb-4">
				<h2 className="text-primary text-left">{project?.title}</h2>
				<button className="text-primary flex items-center gap-1 p-1">
					<Icon name="heart" color="var(--color-primary)" size="xl" />
					<span className="text-2xl font-bold">{project?.likes}</span>
				</button>
			</header>
			<div>
				<div className="flex gap-8 mb-8">
					<div className="flex-1">
						{project?.images && (
							<ImageGallery
								items={reactImageGalleryItems}
								showPlayButton={false}
								showFullscreenButton={false}
								showThumbnails={false}
								renderLeftNav={(onClick, disabled) => (
									<button
										onClick={onClick}
										className="absolute top-[50%] left-[-30px] z-10 p-1 translate-y-[-50%]"
									>
										<img src={ImageArrowSvg} alt="" />
									</button>
								)}
								renderRightNav={(onClick, disabled) => (
									<button
										onClick={onClick}
										className="absolute top-[50%] right-[-30px] z-10 p-1 translate-y-[-50%]"
									>
										<img className="rotate-180" src={ImageArrowSvg} alt="" />
									</button>
								)}
							/>
						)}
					</div>
					<div className="flex-1 flex items-start flex-col">
						<div className="flex gap-1 mb-8">
							{project?.tags.map((tag) => (
								<Tag id={tag.id} text={tag.name} />
							))}
						</div>
						<div className="flex w-fit border-2 border-primary mb-32">
							<span className="flex items-center border-r-2 border-primary p-2">Поделиться:</span>
							<button className="p-2 hover:bg-secondary">
								<img src={emailSvg} alt="" />
							</button>
						</div>
						<CTAbutton
							isProjectMember={project?.is_project_member}
							isProjectOwner={project?.is_project_owner}
						/>
					</div>
				</div>
				<Tabs headers={["О проекте"]} big>
					<div className="flex flex-col items-start">
						{project?.created && (
							<span className="text-secondary">
								<span>Создан </span>
								{new Date(project.created).toLocaleDateString()}
							</span>
						)}
						<p className="mb-8">{project?.about}</p>
						<div className="flex items-center gap-1">
							<Icon name="location" color="var(--color-secondary)" />
							{project?.locations.map((location, index, arr) => (
								<span key={location.id}>
									<span className="text-secondary">{location.name}</span>
									{index !== arr.length - 1 && <span>, </span>}
								</span>
							))}
						</div>
					</div>
				</Tabs>
				<div className="flex flex-col items-start my-8">
					<span className="mb-2 text-2xl">Рекомендуемые участники:</span>
					<div className="min-h-[160px] flex items-center justify-start gap-4 overflow-scroll pb-1">
						{project?.members.length
							? project?.members.map((member, index) => (
									<UserCard
										id={member.user?.id}
										firstName={member.user?.first_name || ""}
										lastName={member.user?.last_name || ""}
										role={member.role}
										img={member.user?.photo || ""}
										key={index}
									/>
							  ))
							: "Здесь пока что пусто"}
					</div>
				</div>
				<Tabs headers={["Команда"]} big>
					{project?.members.length
						? project?.members.map((member, index) => {
								const user = member.user;

								return (
									<div className="flex items-center gap-2 mb-4 px-4 py-2 border-2 border-secondary">
										<span>{index + 1}</span>
										<Image src={user?.photo || ""} width={40} height={40} />
										{user ? (
											<span>
												{user.first_name} {user.last_name}
											</span>
										) : (
											<span>Не найден</span>
										)}
										<Tag className="ml-auto" text={member.role} />
									</div>
								);
						  })
						: "Здесь пока никого нет"}
				</Tabs>
				<div className="mt-8">
					<span className="block text-left text-2xl mb-2">Организатор</span>
					<div className="flex gap-8">
						<div className="w-fit p-2 border-2 border-secondary">
							<Image
								className="w-fit border-2 border-secondary"
								width={150}
								height={150}
								src={project?.owner.photo || ""}
							/>
						</div>
						<div className="flex flex-col items-start">
							<span className="mb-2">
								{project?.owner.first_name} {project?.owner.last_name}
							</span>
							<span className="text-lg">{project?.owner.about}</span>
							<span className="mt-auto mb-1">Контакты:</span>
							<span className="underline">{project?.owner.email}</span>
							<span className="underline">{project?.owner.telegram}</span>
						</div>
					</div>
				</div>
				<div className="mt-4 mb-16">
					<span className="block text-left text-2xl mb-2">Похожие проекты:</span>
					<SmallProjectList data={project?.related_projects} />
				</div>
				<CTAbutton
					className="mx-auto mb-8"
					isProjectMember={project?.is_project_member}
					isProjectOwner={project?.is_project_owner}
				/>
			</div>
		</div>
	);
};

export default ProjectPage;
