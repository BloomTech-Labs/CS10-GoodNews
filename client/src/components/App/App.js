import React, { Component } from 'react';
import axios from 'axios';
import Nav from './Nav/Nav';
import NavLogin from './Nav/NavLogin';
import NavLogout from './Nav/NavLogout';
import SignIn from './Modals/SignIn';
import Register from './Modals/Register';
import Settings from './Modals/Settings'
import NewsFeed from './NewsFeed/NewsFeed';
import Article from './NewsFeed/Article/Article';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredSite: false,
      loggedIn: false,
      showModal: '',
      articles: []
    }
  }

  componentWillMount() {
    this.isLoggedIn();
    this.fetchArticles()
  }

  fetchArticles = () => {
    // const serverUrl = process.env.SERVER_URL + '/api/article';
    const serverUrl = 'http://localhost:5000/api/article';
    axios.get(serverUrl)
      .then( articles => {
        this.setState({ articles: articles.data });
      })
      .catch( err => {
        console.log(err.message)
      })
  }

  toggleModal = (showModal) => {
    this.setState({ showModal });
  }

  isLoggedIn = () => {
    const loggedIn = localStorage.getItem('auth-token') ? true : false;
    if (this.state.loggedIn !== loggedIn) {
      this.setState({ loggedIn });
    }
  }

  switchModals = (modal) => {
    switch(modal) {
      case 'signIn':
        return <SignIn 
          toggleModal={this.toggleModal} 
          login={this.isLoggedIn}/>
      case 'register':
        return <Register 
          toggleModal={this.toggleModal} 
          login={this.isLoggedIn}/>
      case 'settings':
        return <Settings toggleModal={this.toggleModal}/>
      default:
        return null;
    }
  }

  switchLoginLogout = (loggedIn) => {
    switch(loggedIn) {
      case true:
        return <NavLogout 
          toggleLogout={this.isLoggedIn.bind(this)}
          toggleModal={this.toggleModal}/>
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
        <NewsFeed>
          {this.state.articles.map( article => {
            return (
              <Article 
                key={article._id} 
                article={article} 
                articleOptions={this.state.loggedIn}
              />)
          })}
        </NewsFeed>
        {this.switchModals(this.state.showModal)}
      </div>
    );
  }
}

export default App;
