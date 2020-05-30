import * as Constants from "../src/constants";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";

import { Menu, ArrowBack, MoreVert } from "@material-ui/icons";

import styles from "./TopBar.module.css";

export default function TopBar(props) {
	const clickHandler = () => {
		if (props.onClick) props.onClick();
	};

	return (
		<AppBar position="sticky">
			<Toolbar>
				<IconButton
					id="menu"
					edge="start"
					color="inherit"
					aria-label="menu"
					onClick={clickHandler}
				>
					{props.back ? <ArrowBack /> : <Menu />}
				</IconButton>
				<Typography variant="h6" className={styles.title}>
					{props.title ? props.title : Constants.APP_NAME}
				</Typography>
				{props.onOptionsClick && (
					<IconButton
						id="options"
						onClick={(e) => props.onOptionsClick(e)}
					>
						<MoreVert />
					</IconButton>
				)}
			</Toolbar>
		</AppBar>
	);
}
