import React from 'react';
import { Menu } from 'semantic-ui-react';

const NavLogin = (props) => {
  return (
    <Menu.Item 
      onClick={()=>{props.toggleModal('signIn')}} 
      position='right'>
      Sign in
    </Menu.Item>
  );
}
 
export default NavLogin;