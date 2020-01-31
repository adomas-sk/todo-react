import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { amber, brown, grey, red } from '@material-ui/core/colors';

const theme = responsiveFontSizes(
	createMuiTheme({
		palette: {
			primary: brown,
			secondary: amber,
			grey,
			red,
		},
		lengths: {
			defaultPadding: 16,
			mainWidth: 400,
			headerHeight: 64,
		},
	})
);

export default theme;
