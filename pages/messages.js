import WithAuth from "../src/WithAuth";

function Messages() {
	return "testing";
}

const Authed = WithAuth(Messages);
export default Authed;
