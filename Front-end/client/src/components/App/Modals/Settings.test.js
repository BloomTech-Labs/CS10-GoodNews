import React from "react";
import { shallow } from "enzyme";
import Settings from "./Settings";

it("renders without crashing", () => {
  shallow(<Settings />);
});
