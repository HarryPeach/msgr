import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import TextBox from "./TextBox";
import { InputBase, IconButton } from "@material-ui/core";

Enzyme.configure({ adapter: new Adapter() });

it("Triggers action function when enter is pressed", () => {
	const actionFunc = jest.fn();
	const wrapper = shallow(
		<TextBox
			onChange={() => {
				return;
			}}
			textbox="textboxValue"
			sendAction={actionFunc}
		/>
	);
	const input = wrapper.find(InputBase);
	input.simulate("keyPress", { key: "Enter" });
	expect(actionFunc.mock.calls.length).toBe(1);

	input.simulate("keyPress", { key: "a" });
	expect(actionFunc.mock.calls.length).toBe(1);
});

it("Triggers action function when send button is pressed", () => {
	const actionFunc = jest.fn();
	const wrapper = shallow(
		<TextBox
			onChange={() => {
				return;
			}}
			textbox="textboxValue"
			sendAction={actionFunc}
		/>
	);
	const button = wrapper.find(IconButton);
	button.simulate("click");
	expect(actionFunc.mock.calls.length).toBe(1);
});

it("Correctly sets and changes the textbox value", () => {
	const setFunc = jest.fn();
	const wrapper = shallow(<TextBox textbox="testVal" setTextbox={setFunc} />);
	const input = wrapper.find(InputBase);

	expect(input.get(0).props.value).toBe("testVal");

	input.props().onChange({
		target: {
			value: "Hello",
		},
	});

	expect(setFunc.mock.calls[0][0]).toBe("Hello");
});
