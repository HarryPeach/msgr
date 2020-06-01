import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	TextField,
} from "@material-ui/core";

export default function RenameDialog(props) {
	const [textFieldRename, setTextFieldRename] = React.useState("");

	const renameChat = (newName) => {
		if (!newName.match("^[a-zA-Z0-9 ]*$")) {
			if (newName.length >= 64) {
				alert(
					"The provided name is too long, please try a shorter name."
				);
				return;
			}
			if (newName.length === 0) {
				alert("The name field cannot be empty.");
				return;
			}
			alert(
				"The name provided is invalid, please use only alphanumeric characters and spaces."
			);
			return;
		}
		// TODO: Send request to rename chat
		alert("Debug: Renaming chat to: " + newName);
	};

	return (
		<Dialog open={props.open} onClose={() => props.setOpen(false)}>
			<DialogTitle>Rename the chat</DialogTitle>
			<DialogContent>
				<TextField
					id="renameTextField"
					value={textFieldRename}
					onChange={(e) => setTextFieldRename(e.currentTarget.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => props.setOpen(false)} color="secondary">
					Cancel
				</Button>
				<Button
					id="submitButton"
					onClick={() => renameChat(textFieldRename)}
					color="primary"
				>
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	);
}
