import React from "react";
import {
	Card,
	Typography,
	CardContent,
	ButtonBase,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from "@material-ui/core";

import styles from "./Message.module.css";
import clsx from "clsx";

export default function Message(props) {
	const timeoutRef = React.useRef();
	const [dialogOpen, setDialogOpen] = React.useState(false);

	const handleDialogClose = () => {
		setDialogOpen(false);
	};

	const formatTimestamp = (t) => {
		if (!t) return "";
		return new Date(parseInt(t.replace(/0+$/, ""))).toUTCString();
	};

	const handleButtonPress = () => {
		// TODO: Implement Button Long Press Action
		timeoutRef.current = setTimeout(() => setDialogOpen(true), 1000);
	};

	const handleButtonRelease = () => {
		clearTimeout(timeoutRef.current);
	};

	return (
		<>
			<ButtonBase
				className={styles.base}
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
			{/* TODO: Test dialog */}
			<Dialog onClose={handleDialogClose} open={dialogOpen}>
				<DialogTitle>Delete Message</DialogTitle>
				<DialogContent>
					Do you want to delete this message?
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose}>No</Button>
					<Button color="primary" onClick={handleDialogClose}>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
