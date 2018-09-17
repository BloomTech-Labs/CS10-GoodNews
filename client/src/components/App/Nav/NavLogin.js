import React from 'react';
import { Menu } from 'semantic-ui-react';

const NavLogin = (props) => {
  return (
    <div style={{display:'flex'}}>
      <Menu.Item 
        onClick={()=>{props.toggleModal('register')}} 
        position='right'>
        Sign up
      </Menu.Item>
      <Menu.Item 
        onClick={()=>{props.toggleModal('signIn')}} 
        position='right'>
        Sign in
      </Menu.Item>
    </div>
  );
}
 
export default NavLogin;