import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyle = makeStyles(theme => ({
	container: {
		height: '100vh',
		width: '100%',
		backgroundColor: theme.palette.grey[100],
	},
	view: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		height: 'calc(100vh - 64px - 48px)',
	},
	viewContainer: {
		padding: '24px 16px',
	},
	links: {
		width: '100%',
		maxWidth: theme.lengths.mainWidth + theme.lengths.defaultPadding,
		display: 'flex',
		justifyContent: 'flex-end',
	},
	link: {
		textDecoration: 'none',
		padding: 8,
	},
	header: {
		height: theme.lengths.headerHeight,
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.palette.secondary[300],
	},
}));

const ViewContainer = ({ children }) => {
	const classes = useStyle();
	const user = useSelector(state => state.user);
	return (
		<div className={classes.container}>
			<header className={classes.header}>
				<div className={classes.links}>
					<Link className={classes.link} to="/">
						Home
					</Link>
					{user ? (
						<Link className={classes.link} to="/auth">
							Logout
						</Link>
					) : (
						<Link className={classes.link} to="/auth">
							Login
						</Link>
					)}
				</div>
			</header>
			<div className={classes.viewContainer}>
				<div className={classes.view}>{children}</div>
			</div>
		</div>
	);
};

export default ViewContainer;
