import React from 'react';
import { Menu } from 'semantic-ui-react';

const NavLogin = (props) => {
  return (
    <Menu.Item 
      onClick={()=>{props.toggleModal('signIn')}} 
      position='right'
      style={{ color: '#3d3d3d' }}>
      Sign in
    </Menu.Item>
  );
}
 
export default NavLogin;