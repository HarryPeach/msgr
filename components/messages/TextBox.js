import React from "react";
import { Paper, IconButton, InputBase, Divider } from "@material-ui/core";
import { Send } from "@material-ui/icons";

import styles from "./TextBox.module.css";

export default function TextBox(props) {
	const clickHandler = () => {
		if (props.sendAction) props.sendAction();
	};

	const keyPressHandler = (e) => {
		if (e.key === "Enter") {
			props.sendAction();
		}
	};

	return (
		<>
			<Paper className={styles.root}>
				<InputBase
					placeholder="Enter your message"
					className={styles.input}
					value={props.textbox}
					onChange={(e) => props.setTextbox(e.target.value)}
					onKeyPress={(e) => keyPressHandler(e)}
				/>
				<Divider orientation="vertical" className={styles.divider} />
				<IconButton type="submit" onClick={clickHandler}>
					<Send />
				</IconButton>
			</Paper>
		</>
	);
}
