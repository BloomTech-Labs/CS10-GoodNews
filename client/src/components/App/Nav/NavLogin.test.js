import React from "react";
import { shallow } from "enzyme";
import NavLogin from "./NavLogin";

it("renders without crashing", () => {
  shallow(<NavLogin />);
});
