import { Card, Typography, CardContent } from "@material-ui/core";

import styles from "./Message.module.css";
import clsx from "clsx";

export default function Message(props) {
	return (
		<>
			<Card>
				<CardContent className={clsx(props.right && styles.rightAlign)}>
					<Typography variant="body1">{props.text}</Typography>
					<Typography variant="overline" color="textSecondary">
						{props.timestamp}
					</Typography>
				</CardContent>
			</Card>
		</>
	);
}
