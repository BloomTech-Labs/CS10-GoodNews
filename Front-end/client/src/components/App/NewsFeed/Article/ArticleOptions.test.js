import React from "react";
import { shallow } from "enzyme";
import ArticleOptions from "./ArticleOptions";

it("renders without crashing", () => {
  shallow(<ArticleOptions />);
});
