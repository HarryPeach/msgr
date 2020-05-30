import { useEffect } from "react";

import firebase from "../../lib/firebase";
import WithAuth, { AuthContext } from "../../src/WithAuth";
import TopBar from "../../components/TopBar";
import Thread from "../../components/messages/Thread";
import Router from "next/router";

function Messages() {
	const authContext = React.useContext(AuthContext);
	const [threads, setThreads] = React.useState();

	const goToThread = (conversation) => {
		Router.push("/messages/conversation?c=" + conversation);
	};

	useEffect(() => {
		firebase
			.firestore()
			.collection("conversations")
			.where("participants", "array-contains", authContext.uid)
			.get()
			.then((doc) => {
				setThreads(
					doc.docs.map((x) => {
						return (
							<Thread
								key={x.id}
								onClick={() => {
									goToThread(x.id);
								}}
								name={x.data().name}
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
