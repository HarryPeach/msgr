import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import * as Constants from "../src/constants";
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
	expect(blankTitle.text()).toBe(Constants.APP_NAME);

	const namedWrapper = shallow(<TopBar title={"TestTitle"} />);
	const namedTitle = namedWrapper.find(Typography);
	expect(namedTitle.text()).toBe("TestTitle");
});

it("Runs a provided function when its IconButton is clicked", () => {
	const actionFn = jest.fn();
	const wrapper = shallow(<TopBar onClick={actionFn} />);
	expect(actionFn.mock.calls.length).toBe(0);

	const button = wrapper.find("#menu");
	button.simulate("click");
	expect(actionFn.mock.calls.length).toBe(1);
});

it("Ignores clicks when not provided with a handler", () => {
	const wrapper = shallow(<TopBar />);

	const button = wrapper.find("#menu");
	button.simulate("click");
});

it("Shows an additonal icon when an options handler is specified", () => {
	const wrapper = shallow(<TopBar onOptionsClick={() => {}} />);

	expect(wrapper.find(IconButton).length).toBe(2);
});

it("Doesn't show an additonal icon when an options handler is not specified", () => {
	const wrapper = shallow(<TopBar />);

	expect(wrapper.find(IconButton).length).toBe(1);
});

it("Calls the options callback provided on click", () => {
	const actionFn = jest.fn();
	const wrapper = shallow(<TopBar onOptionsClick={actionFn} />);
	expect(actionFn.mock.calls.length).toBe(0);

	const button = wrapper.find("#options");
	button.simulate("click");

	expect(actionFn.mock.calls.length).toBe(1);
});
