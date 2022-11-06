import entityAPI from "api/entityAPI";
import projectsAPI from "api/projectsAPI";
import Input from "components/ui/Input";
import Pagination from "components/ui/Pagination";
import Select from "components/ui/Select";
import { FC, useEffect, useState } from "react";
import { Category, Location, Project } from "types";
import ProjectCard from "./ProjectCard";

interface ProjectSectionProps {}

const ProjectSection: FC<ProjectSectionProps> = () => {
	const [page, setPage] = useState(1);
	const [maxPage, setMaxPage] = useState(1);
	const [projects, setProjects] = useState<Project[] | null>(null);
	const [locations, setLocations] = useState<Location[]>([]);
	const [location, setLocation] = useState<Location>();
	const [categories, setCategories] = useState<Category[]>([]);
	const [category, setCategory] = useState<Category>();
	const [query, setQuery] = useState<string>();

	useEffect(() => {
		entityAPI.getLocations().then((data) => setLocations(data));
		entityAPI.getCategories().then((data) => setCategories(data));
	}, []);

	function debounce(func: () => void, timeout = 300) {
		let timer: any;
		return (...args: any) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				//@ts-ignore
				func.apply(this, args);
			}, timeout);
		};
	}

	useEffect(() => {
		debounce(() =>
			projectsAPI
				.getAllProjects({ page, limit: 30, location: location?.name, query, category: category?.name })
				.then((res) => {
					setProjects(res.projects);
					setMaxPage(res.max_page);
				})
		)();
	}, [page, location?.id, category?.id, query]);

	return (
		<div className="bg-white">
			<div className="wrapper py-8 text-left">
				<h2 className="mb-8">все проекты</h2>
				<div className="flex items-center gap-2 mb-4">
					<input
						className="border-2 border-secondary px-2 min-w-[200px] h-[40px] outline-none"
						placeholder="Поиск"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						type="text"
					/>
					<Select
						placeholder="Выберите регион"
						value={location}
						options={locations}
						onChange={(value) => {
							setLocation(value[0]);
						}}
					/>
					<Select
						placeholder="Выберите категорию"
						value={category}
						options={categories}
						onChange={(value) => {
							setCategory(value[0]);
						}}
					/>
				</div>
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
