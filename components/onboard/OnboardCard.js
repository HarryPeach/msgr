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
							onChange={(e) => setName(e.target.value)}
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
