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
import clsx from "clsx";

import firebase from "../../lib/firebase";
import styles from "./Message.module.css";

export default function Message(props) {
	const timeoutRef = React.useRef();
	const [dialogOpen, setDialogOpen] = React.useState(false);

	/**
	 * Called to close all dialogs on the screen
	 */
	const handleDialogClose = () => {
		setDialogOpen(false);
	};

	/**
	 * Formats the javascript timestamp into a nice readable date
	 * @param {string} t The timestamp to format
	 */
	const formatTimestamp = (t) => {
		if (!t) return "";
		return new Date(parseInt(t.replace(/0+$/, ""))).toUTCString();
	};

	/**
	 * Called when the button is pressed, calls long press if appropriate
	 */
	const handleButtonPress = () => {
		if (props.deleted) return;
		timeoutRef.current = setTimeout(() => onButtonLongPress(), 1000);
	};

	/**
	 * Called when the button is long-pressed
	 */
	const onButtonLongPress = () => {
		setDialogOpen(true);
	};

	/**
	 * Called when the message press is released
	 */
	const handleButtonRelease = () => {
		clearTimeout(timeoutRef.current);
	};

	/**
	 * Deletes a message from the server
	 * @param {string} messageID The ID of the message to be deleted
	 */
	const deleteMessage = (messageID) => {
		firebase
			.firestore()
			.collection("conversations")
			.doc(props.chatID)
			.collection("messages")
			.doc(messageID)
			.update({
				text: "",
				type: "deleted",
			});
		handleDialogClose();
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
					<Button
						color="primary"
						onClick={() => deleteMessage(props.id)}
					>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
