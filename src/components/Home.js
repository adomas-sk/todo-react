import React, { useState, useEffect } from 'react';
import {
	TextField,
	makeStyles,
	List,
	ListItem,
	IconButton,
	Input,
	Checkbox,
	CircularProgress,
	Typography,
	InputAdornment,
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import EditIcon from '@material-ui/icons/Edit';
import CompleteIcon from '@material-ui/icons/CheckCircle';
import IncompleteIcon from '@material-ui/icons/CheckCircleOutline';
import AllIcon from '@material-ui/icons/RemoveCircle';
import ClearIcon from '@material-ui/icons/Clear';
import { useDispatch, useSelector } from 'react-redux';

import { ViewContainer } from '../shared';
import { getTodos, addTodo, deleteTodo, updateTodo } from './actions';
import { useHistory } from 'react-router-dom';

const useStyle = makeStyles(theme => ({
	inputContainer: {
		padding: theme.lengths.defaultPadding,
		border: `1px solid ${theme.palette.primary[300]}`,
		borderRadius: 4,
		maxWidth: theme.lengths.mainWidth,
		margin: 'auto',
		display: 'flex',
		justifyContent: 'space-between',
	},
	form: {
		width: '100%',
	},
	list: {
		maxWidth: theme.lengths.mainWidth + theme.lengths.defaultPadding * 2,
		width: '100%',
	},
	listItem: {
		display: 'flex',
		justifyContent: 'space-between',

		'&:hover $iconButton': {
			opacity: 1,
		},
	},
	crossedListItem: {
		display: 'flex',
		justifyContent: 'space-between',
		textDecoration: 'line-through',

		'&:hover': {
			textDecoration: 'line-through',

			'& $iconButton': {
				opacity: 1,
			},
		},
	},
	iconButton: {
		transition: 'opacity 500ms ease-in-out',
		opacity: 0,
		borderRadius: 4,
		color: theme.palette.red[500],

		'&:hover': {
			backgroundColor: theme.palette.red[100],
		},
	},
	saving: {
		margin: 'auto 12px',
		color: theme.palette.grey[500],
	},
}));

const Home = () => {
	const classes = useStyle();
	const [input, setInput] = useState('');
	const [updating, setUpdating] = useState(null);
	const [updatingInput, setUpdatingInput] = useState('');
	const [show, setShow] = useState('all');
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector(state => state.user);
	const loading = useSelector(state => state.loading);
	const todos = useSelector(state => state.todos);

	useEffect(() => {
		if (!user) {
			history.push('/auth');
		} else {
			dispatch(getTodos());
		}
	}, [dispatch, history, user]);

	const handleSubmit = e => {
		e.preventDefault();
		if (input.length > 0) {
			dispatch(addTodo(input));
			setInput('');
		}
	};

	const handleItemClick = (id, completed) => {
		dispatch(updateTodo(id, { completed }));
	};

	const handleFieldUpdate = () => {
		if (updatingInput.length > 0) {
			dispatch(updateTodo(updating, { todo: updatingInput }));
		}
		setUpdating(null);
	};

	const handleFilterClick = () => {
		if (show === 'all') {
			return setShow('complete');
		}
		if (show === 'complete') {
			return setShow('incomplete');
		}
		return setShow('all');
	};

	const handleItemRemoval = id => {
		dispatch(deleteTodo(id));
	};

	const filteredItems = todos.filter(item => {
		if (show === 'all') {
			return true;
		}
		if (show === 'complete' && item.completed === true) {
			return true;
		}
		if (show === 'incomplete' && item.completed === false) {
			return true;
		}
		return false;
	});

	return (
		<ViewContainer>
			<form className={classes.form} onSubmit={handleSubmit}>
				<div className={classes.inputContainer}>
					<TextField
						fullWidth
						value={input}
						onChange={e => setInput(e.currentTarget.value)}
						placeholder="I need to..."
						label="What I need to do?"
						InputProps={{ disableUnderline: true }}
					/>
					<IconButton color="secondary" disableRipple onClick={handleFilterClick}>
						{show === 'all' && <AllIcon />}
						{show === 'complete' && <CompleteIcon />}
						{show === 'incomplete' && <IncompleteIcon />}
					</IconButton>
				</div>
			</form>
			<List classes={{ root: classes.list }}>
				{loading && (
					<ListItem>
						<CircularProgress color="secondary" size={32} />
						<Typography classes={{ root: classes.saving }}>Saving...</Typography>
					</ListItem>
				)}
				{filteredItems.map((todo, index) => (
					<ListItem
						classes={{ root: todo.completed ? classes.crossedListItem : classes.listItem }}
						key={todo.todo + index}
					>
						<Checkbox
							onChange={() => handleItemClick(todo._id, !todo.completed)}
							checked={todo.completed}
						/>
						<Input
							onClick={() => {
								setUpdatingInput(todo.todo);
								setUpdating(todo._id);
							}}
							startAdornment={
								todo._id === updating && (
									<InputAdornment position="start">
										<IconButton
											disableRipple
											onClick={e => {
												e.stopPropagation();
												setUpdating(null);
											}}
										>
											<ClearIcon />
										</IconButton>
									</InputAdornment>
								)
							}
							onChange={e => setUpdatingInput(e.currentTarget.value)}
							fullWidth
							value={todo._id === updating ? updatingInput : todo.todo}
							disableUnderline
						/>
						{todo._id === updating ? (
							<IconButton disableRipple onClick={() => handleFieldUpdate(todo._id)}>
								<EditIcon />
							</IconButton>
						) : (
							<IconButton
								disableRipple
								onClick={() => handleItemRemoval(todo._id)}
								classes={{ root: classes.iconButton }}
							>
								<RemoveIcon />
							</IconButton>
						)}
					</ListItem>
				))}
			</List>
		</ViewContainer>
	);
};

export default Home;
