import withAuth from "../src/WithAuth";
import TopBar from "../components/TopBar";
import OnboardCard from "../components/onboard/OnboardCard";
import { Container } from "@material-ui/core";

function Onboard() {
	return (
		<>
			<TopBar />
			<Container maxWidth="sm">
				<OnboardCard />
			</Container>
		</>
	);
}

const AuthedOnboard = withAuth(Onboard);
export default AuthedOnboard;
