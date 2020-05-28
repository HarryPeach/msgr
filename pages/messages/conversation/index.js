import { useEffect } from "react";
import { useRouter } from "next/router";
import { animateScroll as scroll } from "react-scroll";

import firebase from "../../../lib/firebase";
import withAuth, { AuthContext } from "../../../src/WithAuth";
import TopBar from "../../../components/TopBar";
import TextBox from "../../../components/messages/TextBox";
import Message from "../../../components/messages/Message";

import styles from "./index.module.css";

function Conversation(props) {
	const router = useRouter();
	const authContext = React.useContext(AuthContext);
	const { c } = router.query;

	const [messages, setMessages] = React.useState();
	const [textbox, setTextbox] = React.useState("");

	const bottomAnchor = React.useRef();

	useEffect(() => {
		firebase
			.firestore()
			.collection("conversations")
			.doc(c)
			.collection("messages")
			.orderBy("timestamp")
			.limit(100)
			.onSnapshot((doc) => {
				setMessages(
					doc.docs.map((x) => {
						return (
							<Message
								key={x.id}
								text={x.data().text}
								right={x.data().sender === authContext.uid}
							/>
						);
					})
				);
				// bottomAnchor.scrollIntoView({ behavior: "smooth" });
				scroll.scrollToBottom();
				// scrollToBottom();
			});
	}, []);

	const sendMessage = () => {
		firebase
			.firestore()
			.collection("conversations")
			.doc(c)
			.collection("messages")
			.add({
				sender: authContext.uid,
				text: textbox,
				timestamp: firebase.firestore.Timestamp.now(),
			});
		setTextbox("");
		// bottomAnchor.scrollIntoView({behavior: "smooth"});
	};

	return (
		<div className={styles.root}>
			<TopBar />
			{messages}
			<TextBox
				onClick={sendMessage}
				textbox={textbox}
				setTextbox={setTextbox}
			/>
			<div ref={bottomAnchor} style={{ float: "left", clear: "both" }} />
		</div>
	);
}

const ConversationAuthed = withAuth(Conversation);
export default ConversationAuthed;
