import React from "react";
import { shallow } from "enzyme";
import UserCard from "./userCard";

describe("UserCard", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<UserCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
