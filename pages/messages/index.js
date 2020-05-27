import { useEffect } from "react";

import firebase from "../../lib/firebase";
import WithAuth, { AuthContext } from "../../src/WithAuth";
import TopBar from "../../components/TopBar";
import Thread from "../../components/messages/Thread";

function Messages() {
	const authContext = React.useContext(AuthContext);
	const [threads, setThreads] = React.useState();

	useEffect(() => {
		firebase
			.firestore()
			.collection("conversations")
			.where("participants", "array-contains", authContext.uid)
			.get()
			.then((doc) => {
				// TODO: filter participants and get friendly name
				setThreads(
					doc.docs.map((x) => {
						return (
							<Thread
								key={x.id}
								name={x.data().participants[1]}
								text={x.data().lastMessage}
							/>
						);
					})
				);
			})
			.catch(console.err);
	}, []);

	return (
		<>
			<TopBar />
			{threads}
		</>
	);
}

const Authed = WithAuth(Messages);
export default Authed;
