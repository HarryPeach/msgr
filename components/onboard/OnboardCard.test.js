import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import OnboardCard from "./OnboardCard";
import { Button, TextField } from "@material-ui/core";

Enzyme.configure({ adapter: new Adapter() });

it("Calls the onSubmit function with the fields values", () => {
	const clickFn = jest.fn();
	const wrapper = shallow(<OnboardCard onSubmit={clickFn} />);

	const nameTextBox = wrapper.find(TextField);
	nameTextBox.simulate("change", { target: { value: "Hello" } });

	const button = wrapper.find(Button);
	button.simulate("click");

	console.log(clickFn.mock.calls[0][0]);

	expect(clickFn.mock.calls[0][0]).toMatchObject({ name: expect.anything() });
});
