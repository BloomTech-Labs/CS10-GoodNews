import React, { Component } from 'react';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
    }
  }

  render() { 
    return ( 
      <div style={{
        width: '100vw',
        height: '80px',
        margin: '0',
        position: 'absolute',
        boxShadow: '0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'row',
      }}>
        <div style={{
          margin: '0px 35px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            Menu
          </div>
          <div onClick={()=>{this.props.toggleModal('signInModal')}}>
            Sign in
          </div>
        </div>
      </div>
    );
  }
}
 
export default Nav;