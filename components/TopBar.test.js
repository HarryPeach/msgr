import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import TopBar from "./TopBar";
import { IconButton, Typography } from "@material-ui/core";
import { Menu, ArrowBack } from "@material-ui/icons";

Enzyme.configure({ adapter: new Adapter() });

it("Replaces menu button with back button when prop provided", () => {
	const wrapper = shallow(<TopBar back />);
	const button = wrapper.find(IconButton);

	expect(button.children().containsMatchingElement(<ArrowBack />)).toBe(true);
	expect(button.children().containsMatchingElement(<Menu />)).toBe(false);
});

it("Shows the menu icon when back prop not provided", () => {
	const wrapper = shallow(<TopBar />);
	const button = wrapper.find(IconButton);

	expect(button.children().containsMatchingElement(<Menu />)).toBe(true);
	expect(button.children().containsMatchingElement(<ArrowBack />)).toBe(
		false
	);
});

it("Shows the app name when a title is not provided", () => {
	const blankWrapper = shallow(<TopBar />);
	const blankTitle = blankWrapper.find(Typography);
	expect(blankTitle.text()).toBe("Etta");

	const namedWrapper = shallow(<TopBar title={"TestTitle"} />);
	const namedTitle = namedWrapper.find(Typography);
	expect(namedTitle.text()).toBe("TestTitle");
});
