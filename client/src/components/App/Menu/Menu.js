import React from 'react';
import { List } from 'semantic-ui-react';

const Menu = (props) => {
  return (
    <List className='main-menu'>
      {props.children}
    </List>
  );
}
 
export default Menu;