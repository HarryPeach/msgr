import {
	Card,
	CardContent,
	Typography,
	Box,
	CardActions,
	Button,
	TextField,
} from "@material-ui/core";

import styles from "./OnboardCard.module.css";

export default function OnboardCard(props) {
	const [name, setName] = React.useState("");

	const handleSubmit = () => {
		if (name.length >= 64) {
			alert("The provided name is too long, please try a shorter name.");
			return;
		}
		if (!name.match("^[a-zA-Z0-9 ]*$")) {
			alert(
				"The name provided is invalid, please use only alphanumeric characters and spaces."
			);
			return;
		}
		props.onSubmit({
			name: name,
		});
	};

	return (
		<Box my={4}>
			<Card>
				<CardContent>
					<Typography variant="h2" component="h1" gutterBottom>
						Account Creation
					</Typography>
					<form noValidate autoComplete="off">
						<TextField
							className={styles.nameTextField}
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
							label="Your name"
						/>
					</form>
				</CardContent>
				<CardActions>
					<Button
						className={styles.submitButton}
						color="secondary"
						onClick={handleSubmit}
					>
						Submit
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
}
