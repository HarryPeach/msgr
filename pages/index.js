import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TopBar from "../components/TopBar";

export default function Index() {
	return (
		<>
			<TopBar></TopBar>
			<Container maxWidth="sm">
				<Box my={4}>
					<Typography variant="h4" component="h1" gutterBottom>
						msgr
					</Typography>
				</Box>
			</Container>
		</>
	);
}
