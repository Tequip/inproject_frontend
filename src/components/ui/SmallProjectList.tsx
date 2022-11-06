import { FC, useMemo } from "react";
import { Project } from "types";
import SmallProjectCard, { ISmallProjectCard } from "./SmallProjectCard";

interface SmallProjectListProps {
	data?: Project[];
}

const SmallProjectList: FC<SmallProjectListProps> = ({ data = [] }) => {
	const mapToSmallProject = (data: Project[] = []) => {
		return data
			? data.map((project) => {
					return {
						id: project.id,
						role: project.categories[0] ? project.categories[0].name : "",
						src: project.image,
						title: project.title,
					} as ISmallProjectCard;
			  })
			: [];
	};

	const smallProjects = useMemo(() => {
		return mapToSmallProject(data);
	}, [data]);

	return (
		<div className="min-h-[160px] flex items-center justify-start gap-4 overflow-scroll pb-1">
			{smallProjects.length
				? smallProjects.map((smallProject, index) => <SmallProjectCard key={index} {...smallProject} />)
				: "Здесь пока что пусто"}
		</div>
	);
};

export default SmallProjectList;
