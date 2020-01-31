import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { initAxios, configAxios } from './axios';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SIGNUP = 'SIGNUP';
export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const UPDATE_TODO = 'UPDATE_TODO';
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const GET_TODOS = 'GET_TODOS';

const token = window.localStorage.getItem('token');

export const initState = {
	loading: false,
	user: token ? { token } : null,
	error: null,
	todos: [],
};

export const logout = () => async dispatch => {
	dispatch({ type: LOGOUT });
	window.localStorage.removeItem('token');
	window.history.pushState('login', 'Login', '/auth');
};

export const reducer = (state = initState, { type, payload }) => {
	switch (type) {
		case ERROR:
			return { ...state, error: payload };
		case GET_TODOS:
			return { ...state, loading: false, todos: payload };
		case LOADING:
			return { ...state, loading: true };
		case LOGIN:
		case SIGNUP:
			return { ...state, loading: false, user: payload };
		case LOGOUT:
			return { ...state, loading: false, user: null };
		default:
			return state;
	}
};

const axiosInstance = initAxios();

const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument({ axios: axiosInstance })));

configAxios(axiosInstance);

export default store;
