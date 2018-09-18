import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

const Nav = (props) => {
  return ( 
    <Menu 
      fixed="top" 
      fluid
      borderless
      size='large'
      style={{
        boxShadow: '0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.2)',
        // padding: '0 1.2em',
        backgroundColor: '#37bc9b',
        height: '5.5em'
      }}>
      <Menu.Item position="left" onClick={props.toggleMenu}>
        <Icon name="sidebar" style={{ color: '#3d3d3d' }} size='large'/>
      </Menu.Item>
      <Menu.Item className="logo"
        style={{ padding: 0, margin: 0 }}
        onClick={()=>window.scrollTo(0,0)}>
        <span style={{ color: '#3d3d3d', paddingRight: '0.2em' }}>GOOD</span>
        <span style={{ color: 'white'}}>NEWS</span>
      </Menu.Item>
      {props.children}
    </Menu>
  );

}
 
export default Nav;