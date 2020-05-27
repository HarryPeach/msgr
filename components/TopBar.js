import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
} from "@material-ui/core";

import { Menu } from "@material-ui/icons";

import styles from "./TopBar.module.css";

export default function TopBar() {
	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton
					edge="start"
					// className={classes.menuButton}
					color="inherit"
					aria-label="menu"
				>
					<Menu />
				</IconButton>
				<Typography variant="h6" className={styles.title}>
					Messenger
				</Typography>
				<Button color="inherit">Login</Button>
			</Toolbar>
		</AppBar>
	);
}
