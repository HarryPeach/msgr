import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Message from "./Message";
import { CardContent } from "@material-ui/core";

Enzyme.configure({ adapter: new Adapter() });

it("Renders timestamps correctly", () => {
	const wrapper = shallow(<Message timestamp="1590681646606000000" />);
	expect(wrapper.text()).toBe("Thu, 28 May 2020 16:00:46 GMT");
});

it("Can render without timestamp", () => {
	const wrapper = shallow(<Message text="Hey there!" />);
	expect(wrapper.text()).toBe("Hey there!");
});

it("Right aligns when provided the prop", () => {
	const wrapperRight = shallow(<Message right />);
	expect(wrapperRight.find(CardContent).get(0).props.className).toContain(
		"rightAlign"
	);

	const wrapperLeft = shallow(<Message />);
	expect(wrapperLeft.find(CardContent).get(0).props.className).not.toBe(
		"rightAlign"
	);
});
