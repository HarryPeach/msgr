import { Card, Typography, CardContent } from "@material-ui/core";

import styles from "./Message.module.css";
import clsx from "clsx";

export default function Message(props) {
	const formatTimestamp = (t) => {
		if (!t) return "";
		return new Date(parseInt(t.replace(/0+$/, ""))).toUTCString();
	};

	return (
		<>
			<Card>
				<CardContent className={clsx(props.right && styles.rightAlign)}>
					<Typography variant="body1">{props.text}</Typography>
					<Typography variant="overline" color="textSecondary">
						{formatTimestamp(props.timestamp)}
					</Typography>
				</CardContent>
			</Card>
		</>
	);
}
