import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { act } from "react-dom/test-utils";
import OnboardCard from "./OnboardCard";
import { Button, TextField } from "@material-ui/core";

Enzyme.configure({ adapter: new Adapter() });

it("Calls the onSubmit function with the fields values", () => {
	const clickFn = jest.fn();
	const wrapper = shallow(<OnboardCard onSubmit={clickFn} />);
	const button = wrapper.find(Button);

	const nameTextBox = wrapper.find(TextField);
	nameTextBox.props().onChange({
		target: {
			value: "Hello",
		},
	});

	button.simulate("click");

	expect(clickFn.mock.calls[0][0]).toMatchObject({ name: expect.anything() });
});

it("Does not call the onSubmit function when name is too long", () => {
	const clickFn = jest.fn();
	const wrapper = mount(<OnboardCard onSubmit={clickFn} />);
	const button = wrapper.find(Button);
	jest.spyOn(window, "alert").mockImplementation(() => {});

	// Put a value that is longer than the max into the textbox
	const nameTextBox = wrapper.find(TextField);
	act(() => {
		nameTextBox.props().onChange({
			target: {
				value: "#".repeat(64),
			},
		});
	});

	button.simulate("click");
	expect(clickFn.mock.calls.length).toBe(0);
	expect(window.alert).toBeCalledWith(expect.stringContaining("too long"));
});

it("Does not call the onSubmit function when name contains invalid characters", () => {
	const clickFn = jest.fn();
	const wrapper = mount(<OnboardCard onSubmit={clickFn} />);
	const button = wrapper.find(Button);
	jest.spyOn(window, "alert").mockImplementation(() => {});

	// Put a name with an invalid character
	const nameTextBox = wrapper.find(TextField);
	act(() => {
		nameTextBox.props().onChange({
			target: {
				value: "This is a name with an invalid char: !",
			},
		});
	});

	button.simulate("click");
	expect(clickFn.mock.calls.length).toBe(0);
	expect(window.alert).toBeCalledWith(expect.stringContaining("invalid"));

	// Put a value that is valid with spaces
	nameTextBox.props().onChange({
		target: {
			value: "I have spaces and I am valid",
		},
	});

	button.simulate("click");
	expect(clickFn.mock.calls.length).toBe(1);
});
