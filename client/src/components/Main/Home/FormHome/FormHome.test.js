import React from "react";
import { shallow } from "enzyme";
import FormHome from "./FormHome";

describe("FormHome", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<FormHome />);
    expect(wrapper).toMatchSnapshot();
  });
});
