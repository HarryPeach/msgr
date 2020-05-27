import { Container, Typography, ButtonBase } from "@material-ui/core";

import styles from "./Thread.module.css";

export default function Thread(props) {
	return (
		<ButtonBase className={styles.button}>
			<Container maxWidth="lg" className={styles.container}>
				<div className={styles.profile}>IMG</div>
				<div className={styles.content}>
					<Typography variant="h5">{props.name}</Typography>
					<Typography variant="body1">{props.text}</Typography>
				</div>
			</Container>
		</ButtonBase>
	);
}
