import { Category, Location, Stage, Tag } from "types";
import baseAxios from "./helpers/baseAxios";

const getTags = async (): Promise<Tag[]> => {
    const response = await baseAxios.get<Tag[]>("/entity/tag");

    return response.data;
};

const getCategories = async (): Promise<Category[]> => {
    const response = await baseAxios.get<Category[]>("/entity/category");

    return response.data;
};

const getStages = async (): Promise<Stage[]> => {
    const response = await baseAxios.get<Stage[]>("/entity/stage");

    return response.data;
};

const getLocations = async (): Promise<Location[]> => {
    const response = await baseAxios.get<Location[]>("/entity/location");

    return response.data;
};


export default { getTags, getCategories, getStages, getLocations };