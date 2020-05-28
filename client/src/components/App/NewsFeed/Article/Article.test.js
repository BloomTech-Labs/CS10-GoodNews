import React from "react";
import { shallow } from "enzyme";
import Article from "./Article";

it("renders without crashing", () => {
  const article = {
    name: "name",
    url: "http://localhost:3000",
    description: "description",
  };
  shallow(<Article article={article} />);
});
