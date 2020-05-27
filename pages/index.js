import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TopBar from "../components/TopBar";

import Router from "next/router";

import firebase from "../lib/firebase";

export default function Index() {
	const provider = React.useRef(null);

	useEffect(() => {
		provider.current = new firebase.auth.GoogleAuthProvider();
	}, []);

	const signin = () => {
		firebase
			.auth()
			.signInWithPopup(provider.current)
			.then((res) => {
				Router.push("messages");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<TopBar />
			<Container maxWidth="sm">
				<Box my={4}>
					<Typography variant="h4" component="h1" gutterBottom>
						msgr
					</Typography>
					<button onClick={signin}>Sign in</button>
				</Box>
			</Container>
		</>
	);
}
