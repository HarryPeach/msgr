import React, { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import { Container, Typography } from "@material-ui/core";
import { SentimentDissatisfied } from "@material-ui/icons";

import firebase from "../../lib/firebase";
import styles from "./Messages.module.css";
import Message from "./Message";

export default function Messages(props) {
	const [messages, setMessages] = React.useState();

	useEffect(() => {
		firebase
			.firestore()
			.collection("conversations")
			.doc(props.chat)
			.collection("messages")
			.orderBy("timestamp")
			.limit(100)
			.onSnapshot((doc) => {
				setMessages(
					doc.docs.map((x) => {
						if (x.data().type === "text") {
							return (
								<Message
									key={x.id}
									text={x.data().text}
									timestamp={
										x.data().timestamp.seconds +
										"" +
										x.data().timestamp.nanoseconds
									}
									right={x.data().sender === props.uid}
								/>
							);
						} else if (x.data().type === "deleted") {
							return <Message key={x.id} deleted />;
						}
					})
				);
				scroll.scrollToBottom();
			});
	}, []);

	if (!messages || messages.length === 0) {
		return (
			<Container
				maxWidth="sm"
				align="center"
				className={styles.noMessages}
			>
				<SentimentDissatisfied
					id="sadIcon"
					className={styles.icon}
					color="disabled"
				/>
				<br />
				<Typography variant="subtitle1" color="textSecondary">
					Looks like you haven't sent any messages yet
				</Typography>
			</Container>
		);
	}

	return <Container maxWidth="md">{messages}</Container>;
}
