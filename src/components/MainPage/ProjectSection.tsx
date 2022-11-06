import projectsAPI from "api/projectsAPI";
import Pagination from "components/ui/Pagination";
import { FC, useEffect, useState } from "react";
import { Project } from "types";
import ProjectCard from "./ProjectCard";

interface ProjectSectionProps {}

const ProjectSection: FC<ProjectSectionProps> = () => {
	const [page, setPage] = useState(1);
	const [maxPage, setMaxPage] = useState(1);
	const [projects, setProjects] = useState<Project[] | null>(null);

	useEffect(() => {
		projectsAPI.getAllProjects({ page, limit: 30 }).then((res) => {
			setProjects(res.projects);
			setMaxPage(res.max_page);
		});
	}, [page]);

	return (
		<div className="bg-white">
			<div className="wrapper py-8 text-left">
				<h2 className="mb-8">все проекты</h2>
				{projects?.length ? (
					<div className="flex justify-between gap-4 flex-wrap mb-4">
						{projects.map((project) => (
							<ProjectCard
								id={project.id}
								categories={project.categories}
								desc={project.about}
								imageURL={project.image}
								title={project.title}
								likesCount={project.likes}
								dateISO={project.created}
								key={project.id}
							/>
						))}
					</div>
				) : (
					<div className="min-h-[500px] flex items-center justify-center">Нет проектов</div>
				)}
				<Pagination page={page} setPage={setPage} max={maxPage} />
			</div>
		</div>
	);
};

export default ProjectSection;
