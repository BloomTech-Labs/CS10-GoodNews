import React from "react";
import { Menu, Icon, Dropdown } from "semantic-ui-react";

const NavLogout = props => {
  const logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("userid");
    props.toggleLogout();
  };

  return (
    <Menu.Item position="right">
      <Dropdown icon="angle down" pointing="top right">
        <Dropdown.Menu>
          <Dropdown.Item text="Sign out" onClick={logout} />
          <Dropdown.Item
            text="Settings"
            onClick={() => props.toggleModal("settings")}
          />
        </Dropdown.Menu>
      </Dropdown>
      <Icon name="user" />
    </Menu.Item>
  );
};

export default NavLogout;
