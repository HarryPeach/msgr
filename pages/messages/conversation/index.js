import { useEffect } from "react";
import { useRouter } from "next/router";

import firebase from "../../../lib/firebase";
import withAuth, { AuthContext } from "../../../src/WithAuth";
import TopBar from "../../../components/TopBar";
import TextBox from "../../../components/messages/TextBox";
import Message from "../../../components/messages/Message";

function Conversation(props) {
	const router = useRouter();
	const authContext = React.useContext(AuthContext);
	const { c } = router.query;

	const [messages, setMessages] = React.useState();
	const [textbox, setTextbox] = React.useState("");

	useEffect(() => {
		// firebase
		// 	.firestore()
		// 	.collection("conversations")
		// 	.doc(c)
		// 	.collection("messages")
		// 	.orderBy("timestamp")
		// 	.get()
		// 	.then((doc) => {
		// 		setMessages(
		// 			doc.docs.map((x) => {
		// 				return (
		// 					<Message
		// 						key={x.id}
		// 						text={x.data().text}
		// 						right={x.data().sender === authContext.uid}
		// 					/>
		// 				);
		// 			})
		// 		);
		// 	});
		firebase
			.firestore()
			.collection("conversations")
			.doc(c)
			.collection("messages")
			.orderBy("timestamp")
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
	};

	return (
		<>
			<TopBar />
			{messages}
			<TextBox
				onClick={sendMessage}
				textbox={textbox}
				setTextbox={setTextbox}
			/>
		</>
	);
}

const ConversationAuthed = withAuth(Conversation);
export default ConversationAuthed;
