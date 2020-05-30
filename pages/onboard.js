import withAuth, { AuthContext } from "../src/WithAuth";
import TopBar from "../components/TopBar";
import OnboardCard from "../components/onboard/OnboardCard";
import firebase from "../lib/firebase";

import Router from "next/router";
import { Container } from "@material-ui/core";

function Onboard() {
	const authContext = React.useContext(AuthContext);

	const submitDetails = (details) => {
		firebase
			.firestore()
			.collection("users")
			.doc(authContext.uid)
			.set(details);
		Router.push("/messages");
	};

	return (
		<>
			<TopBar />
			<Container maxWidth="sm">
				<OnboardCard onSubmit={submitDetails} />
			</Container>
		</>
	);
}

const AuthedOnboard = withAuth(Onboard);
export default AuthedOnboard;
