import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

const MainMenu = (props) => {
  return (
    <Menu className='main-menu' borderless secondary vertical>
      <Menu.Item onClick={props.toggleLandingPage}>
        <Icon name='info circle' size='large' color='grey'/>
        About GOOD NEWS
      </Menu.Item>
      {props.loggedIn &&
        <Menu.Item>
          <Icon name='save' size='large' color='grey'/>
          Saved Articles
        </Menu.Item>}
    </Menu>
  );
}
 
export default MainMenu;