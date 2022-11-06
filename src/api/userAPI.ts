import { Interest, User, Skill, Image } from "types";
import baseAxios from "./helpers/baseAxios";

export interface CreateUserPayload {
    skill: Skill[],
    interest: Interest[],
    first_name: string,
    last_name: string,
    email: string,
    telegram: string,
    about: string,
    status: string,
    role: string,
    photo: {
        file: string;
        filename: string;
    },
}

const getExtension = (base64: string = '') => {
    return base64 ? base64.substring(base64.indexOf('/') + 1, base64.indexOf(';base64')) : '';
}

const getUser = async (id?: number): Promise<User> => {
    const response = await baseAxios.get<User>(`/user${id ? '/' + id : ''}`);

    return response.data;
};

const updateUser = async (user: CreateUserPayload): Promise<CreateUserPayload> => {
    if (!user.photo.filename) {
        // @ts-ignore
        delete user.photo
    }

    const response = await baseAxios.put<CreateUserPayload>('/user', {
        ...user,
        skill: user.skill.map(skill => skill.id),
        interest: user.interest.map(interest => interest.id),
    });

    return response.data;
};

const getAllUsers = async (): Promise<User[]> => {
    const response = await baseAxios.get<User[]>('/users');

    return response.data;
};

const getUserSkills = async (): Promise<Interest[]> => {
    const response = await baseAxios.get<Interest[]>('/user/skill');

    return response.data;
};

const getUserInterests = async (): Promise<Skill[]> => {
    const response = await baseAxios.get<Skill[]>('/user/interest');

    return response.data;
};

export default { getUser, updateUser, getAllUsers, getUserSkills, getUserInterests };