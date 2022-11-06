import { Project } from "types";
import baseAxios from "./helpers/baseAxios";

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

const getAllEvents = async (params: AllProjectsParams = {}): Promise<Project> => {
    const response = await baseAxios.get("/events", {
        params: {
            ...params,
            page: params.page || 1,
            limit: params.limit || 20
        }
    });

    return response.data;
};

export default { getAllEvents }