import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { act } from "react-dom/test-utils";

import RenameDialog from "./RenameDialog";

Enzyme.configure({ adapter: new Adapter() });

it("Returns an error when the new name contains invalid characters", () => {
	const wrapper = mount(<RenameDialog open={true} setOpen={() => {}} />);
	jest.spyOn(window, "alert").mockImplementation(() => {});

	const textField = wrapper.find("#renameTextField").at(0);
	// console.log(textField.get(0));
	act(() => {
		textField.props().onChange({
			currentTarget: {
				value: "This should fail!",
			},
		});
	});

	const button = wrapper.find("#submitButton").at(0);
	button.simulate("click");

	expect(window.alert).toBeCalledWith(expect.stringContaining("invalid"));
});

it("Returns an error when the new name is too long", () => {
	const wrapper = mount(<RenameDialog open={true} setOpen={() => {}} />);
	jest.spyOn(window, "alert").mockImplementation(() => {});

	// Put a value that is longer than the max into the textbox
	const textField = wrapper.find("#renameTextField").at(0);
	act(() => {
		textField.props().onChange({
			currentTarget: {
				value: "a".repeat(64),
			},
		});
	});

	const button = wrapper.find("#submitButton").at(0);
	button.simulate("click");
	expect(window.alert).toBeCalledWith(expect.stringContaining("too long"));
});

it("Returns an error when the new name is blank", () => {
	const wrapper = mount(<RenameDialog open={true} setOpen={() => {}} />);
	jest.spyOn(window, "alert").mockImplementation(() => {});

	const textField = wrapper.find("#renameTextField").at(0);
	act(() => {
		textField.props().onChange({
			currentTarget: {
				value: "",
			},
		});
	});

	const button = wrapper.find("#submitButton").at(0);
	button.simulate("click");
	expect(window.alert).toBeCalledWith(expect.stringContaining("empty"));
});

// TODO: test props.onComplete
