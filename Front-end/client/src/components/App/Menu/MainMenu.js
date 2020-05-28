import React from "react";
import { Menu, Icon } from "semantic-ui-react";

const MainMenu = props => {
  const handleTopicClick = e => {
    const topic = e.target.innerHTML;
    props.switchArticles("trending", topic);
  };
  return (
    <Menu className="main-menu" borderless secondary vertical fixed="top">
      {props.searchBar}
      <Menu.Item
        onClick={() => props.switchArticles("all")}
        style={{ marginTop: "10px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}>
          <Icon
            name="newspaper"
            size="large"
            color="grey"
            style={{ width: "50px" }}
          />
          All articles
        </div>
      </Menu.Item>
      {props.loggedIn && (
        <Menu.Item onClick={() => props.switchArticles("saved")}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}>
            <Icon
              name="list ul"
              size="large"
              color="grey"
              style={{ width: "50px" }}
            />
            Reading list
          </div>
        </Menu.Item>
      )}
      <Menu.Item>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}>
          <Icon
            name="thermometer three quarters"
            size="large"
            color="grey"
            style={{ width: "50px" }}
          />
          Trending topics:
        </div>
        <Menu secondary vertical className="trending-topics">
          {props.trendingTopics.map(topic => {
            return (
              <Menu.Item key={topic} onClick={handleTopicClick}>
                {topic}
              </Menu.Item>
            );
          })}
        </Menu>
      </Menu.Item>
      <Menu.Item onClick={props.toggleLandingPage}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}>
          <Icon
            name="info circle"
            size="large"
            color="grey"
            style={{ width: "50px" }}
          />
          About Good News
        </div>
      </Menu.Item>
      {props.loggedIn && (
        <Menu.Item onClick={() => props.switchArticles("clickbait")}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}>
            <Icon
              name="edit"
              size="large"
              color="grey"
              style={{ width: "50px" }}
            />
            Evaluate clickbait
          </div>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default MainMenu;
