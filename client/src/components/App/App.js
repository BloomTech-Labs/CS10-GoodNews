import React, { Component } from 'react';
import Nav from './Nav/Nav';
import SignIn from './Modals/SignIn';
import Register from './Modals/Register';
import NewsFeed from './NewsFeed/NewsFeed';
import NavLogin from './Nav/NavLogin';
import NavLogout from './Nav/NavLogout';

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

  toggleLoginLogout = () => {
    const loggedIn = localStorage.getItem('auth-token') ? true : false;
    this.setState({ loggedIn })
  }

  switchModals = (modal) => {
    switch(modal) {
      case 'signIn':
        return <SignIn 
          toggleModal={this.toggleModal} 
          login={this.toggleLoginLogout}/>
      case 'register':
        return <Register 
          toggleModal={this.toggleModal} 
          login={this.toggleLoginLogout}/>
      // case 'settings':
      //   return <Settings/>
      default:
        return null;
    }
  }

  switchLoginLogout = (loggedIn) => {
    switch(loggedIn) {
      case true:
        return <NavLogout toggleLogout={this.toggleLoginLogout.bind(this)}/>
      case false:
        return <NavLogin toggleModal={this.toggleModal}/>
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="App">
        <Nav>{this.switchLoginLogout(this.state.loggedIn)}</Nav>
        <NewsFeed/>
        {this.switchModals(this.state.showModal)}
      </div>
    );
  }
}

export default App;
