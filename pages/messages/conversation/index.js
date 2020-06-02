import { useRouter } from "next/router";

import firebase from "../../../lib/firebase";
import withAuth, { AuthContext } from "../../../src/WithAuth";
import TopBar from "../../../components/TopBar";
import TextBox from "../../../components/messages/TextBox";

import styles from "./index.module.css";
import Messages from "../../../components/messages/Messages";
import {
	Menu,
	MenuItem,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
} from "@material-ui/core";
import RenameDialog from "../../../components/messages/conversation/RenameDialog";

function Conversation(props) {
	const router = useRouter();
	const authContext = React.useContext(AuthContext);
	const { c } = router.query;

	const [title, setTitle] = React.useState("");
	const [textbox, setTextbox] = React.useState("");
	const [anchorEl, setAnchorEl] = React.useState();
	const [dialogRenameOpen, setDialogRenameOpen] = React.useState(false);

	const bottomAnchor = React.useRef();

	React.useEffect(() => {
		getTitle();
	}, []);

	const sendMessage = () => {
		const convRef = firebase.firestore().collection("conversations").doc(c);

		convRef.collection("messages").add({
			sender: authContext.uid,
			text: textbox,
			timestamp: firebase.firestore.Timestamp.now(),
		});

		convRef.update({ lastMessage: textbox });
		setTextbox("");
	};

	const getTitle = () => {
		firebase
			.firestore()
			.collection("conversations")
			.doc(c)
			.get()
			.then((doc) => {
				setTitle(doc.data().name);
			})
			.catch(console.error);
	};

	const goBack = () => {
		router.back();
	};

	return (
		<div className={styles.root}>
			<TopBar
				back
				title={title}
				onClick={goBack}
				onOptionsClick={(e) => setAnchorEl(e.currentTarget)}
			/>
			<Messages chat={c} uid={authContext.uid} />
			<TextBox
				sendAction={sendMessage}
				textbox={textbox}
				setTextbox={setTextbox}
			/>
			<div ref={bottomAnchor} style={{ float: "left", clear: "both" }} />
			<Menu
				id="menu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={() => setAnchorEl(null)}
			>
				<MenuItem onClick={() => setDialogRenameOpen(true)}>
					Rename chat
				</MenuItem>
			</Menu>
			<RenameDialog
				open={dialogRenameOpen}
				setOpen={setDialogRenameOpen}
				docId={c}
				currentName={title}
				onComplete={() => {
					getTitle();
					setAnchorEl(null);
				}}
			/>
		</div>
	);
}

const ConversationAuthed = withAuth(Conversation);
export default ConversationAuthed;
