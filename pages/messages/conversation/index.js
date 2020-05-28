import { useEffect } from "react";
import { useRouter } from "next/router";

import firebase from "../../../lib/firebase";
import withAuth, { AuthContext } from "../../../src/WithAuth";
import TopBar from "../../../components/TopBar";
import Message from "../../../components/messages/Message";

function Conversation(props) {
	const router = useRouter();
	const authContext = React.useContext(AuthContext);
	const { c } = router.query;

	const [messages, setMessages] = React.useState();

	useEffect(() => {
		firebase
			.firestore()
			.collection("conversations")
			.doc(c)
			.collection("messages")
			.get()
			.then((doc) => {
				setMessages(
					doc.docs.map((x) => {
						console.log(x);
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

	return (
		<>
			<TopBar />
			{messages}
			{console.log(messages)}
			<p>Messages from {c}</p>
		</>
	);
}

const ConversationAuthed = withAuth(Conversation);
export default ConversationAuthed;
