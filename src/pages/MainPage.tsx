import { FC, useEffect, useState } from "react";
import PopularSection from "components/MainPage/PopularSection";
import ProjectSection from "components/MainPage/ProjectSection";
import projectsAPI from "api/projectsAPI";
import { Project } from "types";

const MainPage: FC = () => {
    const [popularProjects, setPopularProjects] = useState<Project[] | null>(null);

    useEffect(() => {
        projectsAPI.getPopularProjects().then((projects) => {
            setPopularProjects(projects);
        });
    }, []);

    return (
        <div className="overflow-auto overflow-x-hidden">
            {popularProjects && <PopularSection projects={popularProjects} />}
            <ProjectSection />
        </div>
    );
};

export default MainPage;
