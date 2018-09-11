import React, { Component } from 'react';
import Nav from './Nav/Nav';
import SignIn from './Modals/SignIn';
import Register from './Modals/Register';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredSite: false,
      loggedIn: false,
      showModal: ''
    }
  }

  toggleModal = (showModal) => {
    this.setState({ showModal });
  }

  switchModals = (modal) => {
    switch(modal) {
      case 'signIn':
        return <SignIn toggleModal={this.toggleModal}/>
      case 'register':
        return <Register toggleModal={this.toggleModal}/>
      // case 'settings':
      //   return <Settings/>
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="App">
        <Nav toggleModal={this.toggleModal}/>
        {this.switchModals(this.state.showModal)}
      </div>
    );
  }
}

export default App;
