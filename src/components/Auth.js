import React, { useState, useEffect } from 'react';
import { TextField, Button, makeStyles, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ViewContainer } from '../shared';
import { login, signup } from './actions';
import { logout } from '../config/reducer';

const useStyle = makeStyles(theme => ({
	form: {
		width: '100%',
		maxWidth: theme.lengths.mainWidth,
		display: 'flex',
		flexDirection: 'column',
	},
	input: {
		backgroundColor: theme.palette.secondary[100],
		padding: 8,
		borderRadius: 4,
	},
	paddingWrapper: {
		margin: '12px 0',
	},
}));

const Auth = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConf, setPasswordConf] = useState('');
	const [isSignUp, setIsSignUp] = useState(false);
	const dispatch = useDispatch();
	const classes = useStyle();
	const history = useHistory();

	useEffect(() => {
		dispatch(logout());
	}, [dispatch]);

	const handleSubmit = e => {
		e.preventDefault();
		if (isSignUp) {
			return dispatch(signup(email, password, history));
		}
		return dispatch(login(email, password, history));
	};

	return (
		<ViewContainer>
			<form className={classes.form} onSubmit={handleSubmit}>
				<Typography variant="h3">{isSignUp ? 'Sign up' : 'Login'}</Typography>
				<div className={classes.paddingWrapper}>
					<TextField
						variant="filled"
						InputProps={{ disableUnderline: true }}
						fullWidth
						label="Email"
						value={email}
						onChange={e => setEmail(e.currentTarget.value)}
					/>
				</div>
				<div className={classes.paddingWrapper}>
					<TextField
						variant="filled"
						InputProps={{ disableUnderline: true }}
						fullWidth
						type="password"
						label="Password"
						value={password}
						onChange={e => setPassword(e.currentTarget.value)}
					/>
				</div>
				{isSignUp && (
					<div className={classes.paddingWrapper}>
						<TextField
							variant="filled"
							InputProps={{ disableUnderline: true }}
							fullWidth
							type="password"
							label="Password Confirmation"
							value={passwordConf}
							onChange={e => setPasswordConf(e.currentTarget.value)}
						/>
					</div>
				)}
				<div className={classes.paddingWrapper}>
					<Button
						fullWidth
						variant="contained"
						disabled={!email || !password || (isSignUp && !passwordConf)}
						disableElevation
						color="secondary"
						type="submit"
					>
						{isSignUp ? 'Sign up' : 'Login'}
					</Button>
				</div>
				<div className={classes.paddingWrapper}>
					<Button
						fullWidth
						variant="outlined"
						disableElevation
						color="primary"
						onClick={() => setIsSignUp(!isSignUp)}
					>
						{isSignUp ? 'Login' : 'Sign up'}
					</Button>
				</div>
			</form>
		</ViewContainer>
	);
};

export default Auth;
