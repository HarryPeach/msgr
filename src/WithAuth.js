import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import firebase from "../lib/firebase";

export const AuthContext = React.createContext({});

function withAuth(Component) {
	return (props) => {
		const router = useRouter();
		const [loading, setLoading] = React.useState(true);
		const [user, setUser] = React.useState();

		useEffect(() => {
			firebase.auth().onAuthStateChanged((newuser) => {
				if (newuser) {
					setUser(newuser);
					const userRef = firebase
						.firestore()
						.collection("users")
						.doc(newuser.uid);
					userRef.get().then((userInfo) => {
						if (
							userInfo.data()?.name === undefined &&
							router.pathname !== "/onboard"
						) {
							// TODO: Uncomment this when onboard page is ready
							// router.push("/onboard");
						}
					});
				} else {
					setUser(null);
				}

				setLoading(false);
			});
		}, []);

		if (loading) {
			return (
				<>
					<p>Waiting for authentication provider...</p>
				</>
			);
		}

		if (!user) {
			return (
				<>
					<Link href="/">
						<a>Please login to access this page</a>
					</Link>
				</>
			);
		}

		return (
			<AuthContext.Provider value={user}>
				<Component {...props} />
			</AuthContext.Provider>
		);
	};
}

export async function getStaticProps(context) {
	return {
		props: {
			pathname: "test",
		},
	};
}

export default withAuth;
