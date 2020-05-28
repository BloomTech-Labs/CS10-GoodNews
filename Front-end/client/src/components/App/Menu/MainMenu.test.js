import React from "react";
import { shallow } from "enzyme";
import MainMenu from "./MainMenu";

it("renders without crashing", () => {
  const trendingTopics = [1, 2];
  shallow(<MainMenu trendingTopics={trendingTopics} />);
});
