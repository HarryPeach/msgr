import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
} from "@material-ui/core";

import { Menu, ArrowBack } from "@material-ui/icons";

import styles from "./TopBar.module.css";

export default function TopBar(props) {
	return (
		<AppBar position="sticky">
			<Toolbar>
				<IconButton edge="start" color="inherit" aria-label="menu">
					{props.back ? <ArrowBack /> : <Menu />}
				</IconButton>
				<Typography variant="h6" className={styles.title}>
					{props.title ? props.title : "Etta"}
				</Typography>
			</Toolbar>
		</AppBar>
	);
}
