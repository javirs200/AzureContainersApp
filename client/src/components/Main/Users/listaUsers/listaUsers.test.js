import React from "react";
import { shallow } from "enzyme";
import ListaUsers from "./listaUsers";

describe("ListaUsers", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ListaUsers />);
    expect(wrapper).toMatchSnapshot();
  });
});
