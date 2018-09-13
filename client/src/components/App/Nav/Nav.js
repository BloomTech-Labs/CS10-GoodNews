import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { 

    }
  }

  render() { 
    return ( 
      // <div style={{
      //   width: '100vw',
      //   height: '80px',
      //   margin: '0',
      //   position: 'absolute',
      //   top: '0',
      //   boxShadow: '0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.2)',
      //   display: 'flex',
      //   flexDirection: 'row',
      //   backgroundColor: 'white'
      // }}>
      //   <div style={{
      //     margin: '0px 35px',
      //     width: '100%',
      //     display: 'flex',
      //     justifyContent: 'space-between',
      //     alignItems: 'center'
      //   }}>
      //     <div>
      //       Menu
      //     </div>
      //     <div onClick={()=>{this.props.toggleModal('signIn')}}>
      //       Sign in
      //     </div>
      //   </div>
      // </div>
      <Menu 
        fixed="top" 
        fluid
        style={{
          boxShadow: '0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.2)',
          padding: '1.2em',
        }}>
        <Menu.Item position="left">
          <Icon name="sidebar"/>
        </Menu.Item>
        <Menu.Item onClick={()=>{this.props.toggleModal('signIn')}} position='right'>
          Sign in
        </Menu.Item>
      </Menu>
    );
  }
}
 
export default Nav;