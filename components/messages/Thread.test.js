import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Thread from "./Thread";
import { ButtonBase } from "@material-ui/core";

Enzyme.configure({ adapter: new Adapter() });

it("Triggers onClick correctly", () => {
	const actionFunc = jest.fn();
	const wrapper = shallow(<Thread onClick={actionFunc} />);
	const button = wrapper.find(ButtonBase);
	button.simulate("click");
	expect(actionFunc.mock.calls.length).toBe(1);
});
