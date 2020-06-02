import { Card, Typography, CardContent, ButtonBase } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

import styles from "./Message.module.css";
import clsx from "clsx";

export default function Message(props) {
	const timeoutRef = React.useRef();

	const formatTimestamp = (t) => {
		if (!t) return "";
		return new Date(parseInt(t.replace(/0+$/, ""))).toUTCString();
	};

	const handleButtonPress = () => {
		// TODO: Implement Button Long Press Action
		timeoutRef.current = setTimeout(() => alert("Long press"), 1000);
	};

	const handleButtonRelease = () => {
		clearTimeout(timeoutRef.current);
	};

	return (
		<>
			<ButtonBase
				component="div"
				onTouchStart={handleButtonPress}
				onTouchEnd={handleButtonRelease}
				onMouseDown={handleButtonPress}
				onMouseUp={handleButtonRelease}
				onMouseLeave={handleButtonRelease}
			>
				<Card className={styles.message} elevation={0}>
					<CardContent
						className={clsx(
							props.right && styles.rightAlign,
							styles.messageContent
						)}
					>
						{props.deleted ? (
							<Typography variant="overline">
								Deleted message
							</Typography>
						) : (
							<>
								<Typography variant="body1">
									{props.text}
								</Typography>
								<Typography
									variant="overline"
									color="textSecondary"
								>
									{formatTimestamp(props.timestamp)}
								</Typography>
							</>
						)}
					</CardContent>
				</Card>
			</ButtonBase>
		</>
	);
}
