import { User } from "types";
import baseAxios from "./helpers/baseAxios";

export interface IAuthPayload {
	email: string;
	password: string;
}

export interface IAuthResponse {
	access_token?: string;
	refresh_token?: string;
	user: User;
}

const login = async (payload: IAuthPayload): Promise<IAuthResponse> => {
	const response = await baseAxios.post<IAuthResponse>("/auth", {
		email: payload.email,
		password: payload.password
	});

	return response.data;
};

const register = async (payload: IAuthPayload): Promise<IAuthResponse> => {
	const response = await baseAxios.post<IAuthResponse>("/auth/signup", {
		first_name: '',
		last_name: '',
		email: payload.email,
		password: payload.password
	});

	return response.data;
};

const relogin = async (): Promise<IAuthResponse> => {
	const response = await baseAxios.get<User>("/user");

	return {
		user: response.data
	};
};

export default { login, register, relogin };