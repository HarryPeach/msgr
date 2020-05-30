import { Container, Typography, ButtonBase } from "@material-ui/core";

import styles from "./Thread.module.css";

export default function Thread(props) {
	const clickHandler = () => {
		props.onClick();
	};

	return (
		<ButtonBase className={styles.button} onClick={clickHandler}>
			<Container maxWidth="lg" className={styles.container}>
				<div className={styles.profile} />
				<div className={styles.content}>
					<Typography variant="h6">{props.name}</Typography>
					<Typography variant="body1" color="textSecondary">
						{props.text}
					</Typography>
				</div>
			</Container>
		</ButtonBase>
	);
}
