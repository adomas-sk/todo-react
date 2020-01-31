import { LOADING, LOGIN, ERROR, SIGNUP, ADD_TODO, GET_TODOS, DELETE_TODO } from '../config/reducer';

export const login = (email, password, history) => async (dispatch, _, { axios }) => {
	try {
		dispatch({ type: LOADING });

		const response = await axios.post('/login', { email, password });

		window.localStorage.setItem('token', response.token);
		dispatch({ type: LOGIN, payload: response });
		history.push('/');
	} catch (error) {
		dispatch({ type: ERROR, payload: error.message });
	}
};

export const signup = (email, password, history) => async (dispatch, _, { axios }) => {
	try {
		dispatch({ type: LOADING });

		const response = await axios.post('/signup', { email, password });

		window.localStorage.setItem('token', response.token);
		dispatch({ type: SIGNUP, payload: response });
		history.push('/');
	} catch (error) {
		dispatch({ type: ERROR, payload: error.message });
	}
};

export const deleteTodo = id => async (dispatch, _, { axios }) => {
	try {
		dispatch({ type: LOADING });

		const response = await axios.delete('/todo', { data: { id } });

		dispatch({ type: DELETE_TODO, payload: response.todo });

		dispatch(getTodos());
	} catch (error) {
		dispatch({ type: ERROR, payload: error.message });
	}
};

export const updateTodo = (id, todo) => async (dispatch, _, { axios }) => {
	try {
		dispatch({ type: LOADING });

		const response = await axios.put('/todo', { id, todo });

		dispatch({ type: DELETE_TODO, payload: response.todo });

		dispatch(getTodos());
	} catch (error) {
		dispatch({ type: ERROR, payload: error.message });
	}
};

export const addTodo = todo => async (dispatch, _, { axios }) => {
	try {
		dispatch({ type: LOADING });

		const response = await axios.post('/todo', { todo });

		dispatch({ type: ADD_TODO, payload: response.todo });

		dispatch(getTodos());
	} catch (error) {
		dispatch({ type: ERROR, payload: error.message });
	}
};
export const getTodos = () => async (dispatch, _, { axios }) => {
	try {
		dispatch({ type: LOADING });

		const response = await axios.get('/todos');

		dispatch({ type: GET_TODOS, payload: response.todos });
	} catch (error) {
		dispatch({ type: ERROR, payload: error.message });
	}
};
