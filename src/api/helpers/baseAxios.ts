import axios from 'axios';

const baseAxios = axios.create({
	baseURL: 'http://158.160.16.111/api',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	}
});

baseAxios.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem('accessToken');
		const auth = accessToken ? `Bearer ${accessToken}` : '';
		if (config.headers) {
			config.headers.Authorization = auth;
		}

		return config;
	},
	(error) => Promise.reject(error),
);

export default baseAxios;