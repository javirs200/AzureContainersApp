import React from "react";
import { shallow } from "enzyme";
import Offer_View from "./Offer_View";

describe("Offer_View", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Offer_View />);
    expect(wrapper).toMatchSnapshot();
  });
});
