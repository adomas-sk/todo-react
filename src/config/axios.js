import axios from 'axios';

export const initAxios = () => {
	const customAxios = axios.create({
		baseURL: 'https://serene-taiga-76992.herokuapp.com',
		timeout: 15000,
	});

	return customAxios;
};

export const configAxios = axiosInstance => {
	const onRequestSuccess = config => {
		const token = window.localStorage.getItem('token');
		const headers = { ...config.headers };
		if (!token) {
			return config;
		}
		headers.token = token;

		config.headers = headers;

		return config;
	};

	const onRequestError = error => {
		throw error;
	};

	const onResponseSuccess = response => {
		if (!response.data) {
			throw new Error('No data received');
		}
		return response.data;
	};

	const onResponseFailure = error => {
		if (error.response && error.response.data && error.response.data.error) {
			throw new Error(error.response.data.error);
		}
		throw error;
	};

	axiosInstance.interceptors.request.use(onRequestSuccess, onRequestError);
	axiosInstance.interceptors.response.use(onResponseSuccess, onResponseFailure);
};
