import { FC, useState } from "react";
import PopularCard from "./PopularCard";
import ArrowRightImg from "assets/arrow-right.svg";
import { Project } from "types";

interface PopularSectionProps {
	projects: Project[];
}

const PopularSection: FC<PopularSectionProps> = ({ projects }) => {
	return (
		<div className="bg-secondary text-card">
			<div className="wrapper py-8 text-left">
				<h2 className="mb-8">популярное сейчас</h2>
				<div className="flex gap-8 flex-wrap lg:flex-nowrap">
					<PopularCard
						className="flex-1"
						id={projects[0].id}
						title={projects[0].title}
						dateISO={projects[0].created}
						desc={projects[0].about}
						locations={projects[0].locations}
						imgUrl={projects[0].image}
						size="big"
						vertical
					/>
					<div className="flex flex-col gap-4 flex-1">
						{projects.slice(1, 4).map((project) => (
							<PopularCard
								id={project.id}
								key={project.id}
								title={project.title}
								dateISO={project.created}
								desc={project.about}
								locations={project.locations}
								imgUrl={project.image}
							/>
						))}
						{/* <button className="relative hover:text-primary transition-all">
							<img src={ArrowRightImg} alt="arrow_right" />
							<span className="text-background absolute bottom-[-10px] left-0">Больше</span>
						</button> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PopularSection;
