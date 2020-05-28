import React from "react";
import { shallow } from "enzyme";
import NavLogout from "./NavLogout";

it("renders without crashing", () => {
  shallow(<NavLogout />);
});
