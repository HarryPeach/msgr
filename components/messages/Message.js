import { Card, Typography, CardContent } from "@material-ui/core";

import styles from "./Message.module.css";
import clsx from "clsx";

export default function Message(props) {
	return (
		<>
			<Card>
				<CardContent className={clsx(props.right && styles.rightAlign)}>
					<Typography variant="body1">{props.text}</Typography>
					<br />
					<Typography variant="overline">12:00am</Typography>
				</CardContent>
			</Card>
		</>
	);
}
