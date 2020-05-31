import { useRouter } from "next/router";

import firebase from "../../../lib/firebase";
import withAuth, { AuthContext } from "../../../src/WithAuth";
import TopBar from "../../../components/TopBar";
import TextBox from "../../../components/messages/TextBox";

import styles from "./index.module.css";
import Messages from "../../../components/messages/Messages";
import { Menu, MenuItem } from "@material-ui/core";

function Conversation(props) {
	const router = useRouter();
	const authContext = React.useContext(AuthContext);
	const { c } = router.query;

	const [title, setTitle] = React.useState("");
	const [textbox, setTextbox] = React.useState("");
	const [anchorEl, setAnchorEl] = React.useState();

	const bottomAnchor = React.useRef();

	React.useEffect(() => {
		firebase
			.firestore()
			.collection("conversations")
			.doc(c)
			.get()
			.then((doc) => {
				setTitle(doc.data().name);
			})
			.catch(console.error);
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
				<MenuItem>Rename chat</MenuItem>
			</Menu>
		</div>
	);
}

const ConversationAuthed = withAuth(Conversation);
export default ConversationAuthed;
