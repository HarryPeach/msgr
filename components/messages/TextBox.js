import { Paper, IconButton, InputBase, Divider } from "@material-ui/core";
import { Send } from "@material-ui/icons";

import styles from "./TextBox.module.css";

export default function TextBox(props) {
	const clickHandler = () => {
		props.onClick();
	};

	return (
		<>
			<Paper className={styles.root}>
				<InputBase
					placeholder="Enter your message"
					className={styles.input}
					value={props.textbox}
					onChange={(e) => props.setTextbox(e.target.value)}
				/>
				<Divider orientation="vertical" className={styles.divider} />
				<IconButton type="submit" onClick={clickHandler}>
					<Send />
				</IconButton>
			</Paper>
		</>
	);
}
