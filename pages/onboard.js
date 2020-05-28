import withAuth from "../src/WithAuth";
import TopBar from "../components/TopBar";
import {
	Card,
	CardContent,
	Typography,
	Box,
	Container,
	CardActions,
	Button,
	TextField,
} from "@material-ui/core";

function Onboard() {
	return (
		<>
			<TopBar />
			<Container maxWidth="sm">
				<Box my={4}>
					<Card>
						<CardContent>
							<Typography
								variant="h2"
								component="h1"
								gutterBottom
							>
								Account Creation
							</Typography>
							<form noValidate autoComplete="off">
								<TextField label="Your name" />
							</form>
						</CardContent>
						<CardActions>
							<Button color="secondary">Submit</Button>
						</CardActions>
					</Card>
				</Box>
			</Container>
		</>
	);
}

const AuthedOnboard = withAuth(Onboard);
export default AuthedOnboard;
