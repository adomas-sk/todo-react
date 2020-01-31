import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';

import Home from './components/Home';
import Auth from './components/Auth';
import theme from './config/theme';
import NotFound from './components/NotFound';
import store from './config/reducer';

function App() {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<Router>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/auth">
							<Auth />
						</Route>
						<Route>
							<NotFound />
						</Route>
					</Switch>
				</Router>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
