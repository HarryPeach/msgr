import { useRouter } from "next/router";
import withAuth from "../../../src/WithAuth";
import TopBar from "../../../components/TopBar";
import { useEffect } from "react";

function Conversation(props) {
	const router = useRouter();
	const authContext = React.useContext(AuthContext);
	const { c } = router.query;

	useEffect(() => {
		firebase
			.firestore()
			.collection("conversations")
			.where("participants", "array-contains", authContext.uid)
			.get(); // TODO: this
	}, []);

	return (
		<>
			<TopBar />
			<p>Messages from {c}</p>
		</>
	);
}

const ConversationAuthed = withAuth(Conversation);
export default ConversationAuthed;
