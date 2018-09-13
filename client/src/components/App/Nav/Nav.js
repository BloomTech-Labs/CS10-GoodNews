import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

const Nav = (props) => {
  return ( 
    <Menu 
      fixed="top" 
      fluid
      borderless
      style={{
        boxShadow: '0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.2)',
        padding: '1.2em',
      }}>
      <Menu.Item position="left">
        <Icon name="sidebar"/>
      </Menu.Item>
      {props.children}
    </Menu>
  );

}
 
export default Nav;