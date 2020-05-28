import React from "react";
import { shallow } from "enzyme";
import Weather from "./Weather";

it("renders without crashing", () => {
  shallow(<Weather />);
});
