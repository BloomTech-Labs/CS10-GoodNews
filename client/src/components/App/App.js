import React, { Component } from 'react';
import Nav from './Nav/Nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredSite: false,
      loggedIn: false,
      signInModal: false,
      registerModal: false
    }
  }

  toggleModal = (modal) => {
    const on = !this.state[modal];
    this.setState({[modal]: on});
  }

  render() {
    return (
      <div className="App">
        <Nav toggleModal={this.toggleModal}/>
      </div>
    );
  }
}

export default App;
