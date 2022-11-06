import { Category, Tag } from "types";

export interface IShortProject {
    id: number,
    title: string,
    categories: Category[],
    locations: Location[],
    tags: Tag[],
    created: string,
    likes: number,
    image: string,
    about: string
}