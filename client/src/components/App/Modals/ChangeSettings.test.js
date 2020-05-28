import React from "react";
import { shallow } from "enzyme";
import ChangeSettings from "./ChangeSettings";

it("renders without crashing", () => {
  shallow(<ChangeSettings />);
});
