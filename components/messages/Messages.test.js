import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Messages from "./Messages";
import { SentimentDissatisfied } from "@material-ui/icons";

Enzyme.configure({ adapter: new Adapter() });

it("displays a message when theres no messages", () => {
	const wrapper = shallow(<Messages chat="" uid="" />);
	const cont = wrapper.find("#sadIcon");
	expect(cont.length).toBe(1);
});
