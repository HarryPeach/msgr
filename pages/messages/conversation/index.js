import { useRouter } from "next/router";

import firebase from "../../../lib/firebase";
import withAuth, { AuthContext } from "../../../src/WithAuth";
import TopBar from "../../../components/TopBar";
import TextBox from "../../../components/messages/TextBox";

import styles from "./index.module.css";
import Messages from "../../../components/messages/Messages";

function Conversation(props) {
	const router = useRouter();
	const authContext = React.useContext(AuthContext);
	const { c } = router.query;

	const [textbox, setTextbox] = React.useState("");

	const bottomAnchor = React.useRef();

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
			<TopBar back onClick={goBack} />
			<Messages chat={c} uid={authContext.uid} />
			<TextBox
				sendAction={sendMessage}
				textbox={textbox}
				setTextbox={setTextbox}
			/>
			<div ref={bottomAnchor} style={{ float: "left", clear: "both" }} />
		</div>
	);
}

const ConversationAuthed = withAuth(Conversation);
export default ConversationAuthed;
