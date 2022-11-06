import { FullProject, Image, Member, Project } from "types";
import baseAxios from "./helpers/baseAxios";

export interface ICreateProjectPayload {
    title: string;
    images: Image[];
    about: string;
    short_about: string;
    owner_id?: number | null;
    members: {
        role: string;
        user_id: number | null;
    }[];
    categories: number[];
    locations: number[];
    tags: number[];
    deadline?: string;
    is_hidden?: string;
    stage_id?: string;
}

export interface IProjectResponse {
    max_page: number;
    current_page: number;
    projects: Project[];
}

export interface AllProjectsParams {
    query?: string;
    location?: string;
    category?: string;
    page?: number;
    limit?: number;
}

const getAllProjects = async (params: AllProjectsParams = {}): Promise<IProjectResponse> => {
    const response = await baseAxios.get<IProjectResponse>("/projects", {
        params: {
            ...params,
            page: params.page || 1,
            limit: params.limit || 20
        }
    });

    return response.data;
};

const getPopularProjects = async (): Promise<Project[]> => {
    const response = await baseAxios.get<Project[]>("/projects/popular");

    return response.data;
};

const getProject = async (id: number): Promise<FullProject> => {
    const response = await baseAxios.get<FullProject>(`/project/${id}`);

    return response.data;
};

const createProject = async (project: ICreateProjectPayload): Promise<ICreateProjectPayload> => {
    const response = await baseAxios.post<ICreateProjectPayload>(`/project`, project);

    return response.data;
};


export default { getAllProjects, getPopularProjects, getProject, createProject };