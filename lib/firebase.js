import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// import "firebase/storage";

const config = {
	apiKey: "AIzaSyBRFgFsqIFjZdtQ-LriE7EvLH6X9lwTYcs",
	authDomain: "g-messenger-6df22.firebaseapp.com",
	databaseURL: "https://g-messenger-6df22.firebaseio.com",
	projectId: "g-messenger-6df22",
	storageBucket: "g-messenger-6df22.appspot.com",
	messagingSenderId: "761195176268",
	appId: "1:761195176268:web:604e6bcea2dc8ec668efe9",
};

if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

export default firebase;
