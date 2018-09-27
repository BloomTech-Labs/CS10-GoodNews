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
import LandingPage from './LandingPage/LandingPage';
import MainMenu from './Menu/MainMenu';
import { Search } from 'semantic-ui-react';
import _ from 'lodash';

// Production Server URL or localhost for local testing
const url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SERVER : 'http://localhost:5000';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visited: localStorage.getItem('visited'),
      loggedIn: false,
      showModal: '',
      showMenu: false,
      articleOptions: 'all',
      articles: [],
      searchOptions: [],
      searchValue: '',
      allArticles: [],
      trendingTopics: []
    }
  }

  componentDidMount() {
    this.isLoggedIn();
    this.fetchArticles();
    this.fetchTrendingTopics();
  }

  fetchArticles = () => {
    axios.get(`${url}/api/article/get-articles/0`)
      .then( articles => {
        this.setState({ 
          articles: articles.data, 
          allArticles: articles.data,
          searchOptions: articles.data
        })
      })
      .catch( err => console.log(err))
  }

  fetchClickbait = () => {
    axios.get(`${url}/api/article/get-articles/1`)
      .then( articles => {
        this.setState({ articles: articles.data, searchOptions: articles.data })
      })
      .catch( err => console.log(err))
  }

  fetchTrendingTopics = () => {
    axios.get(`${url}/api/article/topfive`)
      .then( topics => {
        const trendingTopics = topics.data.map( topic => {
          return topic._id.keyword
        })
        this.setState({ trendingTopics });
      })
      .catch( err => console.log(err))
  }

  fetchArticlesByTopic = (topic) => {
    axios.get(`${url}/api/article/${topic}`)
      .then( articles => {
        this.setState({ articles: articles.data, searchOptions: articles.data });
      })
      .catch( err => console.log(err))
  }

  fetchSavedArticles = () => {
    if (this.state.loggedIn){
      const config = {
        headers: {
          'authorization': localStorage.getItem('auth-token'),
          'userid': localStorage.getItem("userid")
        }
      }
      axios.get(`${url}/api/article/user-saved`, config)
        .then( user => {
          const savedArticles = user.data.saved_articles;
          this.setState({ articles: savedArticles, searchOptions: savedArticles });
          window.scrollTo(0,0);
        })
        .catch( err => console.log(err))
    }
  }

  toggleLandingPage = () => {
    let visited = localStorage.getItem('visited');
    if (visited === 'false' || visited === false || visited === null) {
      visited = true;
    } else {
      visited = false;
    }
    localStorage.setItem('visited', visited);
    this.setState({ visited });
    window.scrollTo(0,0);
  }

  toggleModal = (showModal) => {
    this.setState({ showModal });
  }

  toggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  }

  isLoggedIn = () => {
    const loggedIn = localStorage.getItem('auth-token') ? true : false;
    // const articleOptions = loggedIn ? 'loggedIn' : ''
    if (this.state.loggedIn !== loggedIn) {
      this.setState({ loggedIn });
    }
  }

  switchArticles = (articleSet, topic=null) => {
    let articles;
    let articleOptions;
    switch(articleSet) {
      case 'all':
        this.resetSearch()
        articles = this.state.allArticles;
        articleOptions = 'all';
        this.setState({ articles, articleOptions, searchOptions: articles });
        break;
      case 'saved':
        this.resetSearch()
        this.fetchSavedArticles();
        articleOptions = 'saved';
        this.setState({ articleOptions })
        break;
      case 'clickbait':
        this.resetSearch()
        this.fetchClickbait();
        articleOptions = 'clickbait';
        this.setState({ articleOptions })
        break;
      case 'trending':
        this.resetSearch()
        this.fetchArticlesByTopic(topic)
        articleOptions = 'all';
        this.setState({ articleOptions })
        break;
      default:
        this.resetSearch()
        articles = this.state.allArticles;
        this.setState({ articles, articleOptions });
        break;
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

  resetSearch = () => {
    this.setState({
      searchValue: '',
      articles: this.state.searchOptions,
      isLoading: false
    })
  }

  handleResultSelect = (e, {result}) => this.setState({ searchValue: result.name })

  handleSearchChange = (e, {value}) => {
    this.setState({ isLoading: true, searchValue: value })
    if (this.state.searchValue.length < 1) {
      return this.resetSearch()
    } else {
      const re = new RegExp(_.escapeRegExp(this.state.searchValue), 'i');
      const isMatch = result => re.test(result.name);

      this.setState({
        isLoading: false,
        articles: _.filter(this.state.searchOptions, isMatch)
      })
    }
  }

  render() {
    return (
      this.state.visited ? (
        <div className="App">

          <Nav toggleMenu={this.toggleMenu}>
            {this.switchLoginLogout(this.state.loggedIn)}
          </Nav>
          {this.state.showMenu && 
            <MainMenu
              searchBar={<Search
                loading={this.state.isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, { leading: true })}
                results={this.state.articles}
                value={this.state.searchValue}
                {...this.props}/>} 
              loggedIn={this.state.loggedIn} 
              trendingTopics={this.state.trendingTopics}
              toggleLandingPage={this.toggleLandingPage}
              switchArticles={this.switchArticles}
              fetchArticlesByTopic={this.fetchArticlesByTopic}
            />}
          <NewsFeed>
            {this.state.articles.map( article => {
              return (
                <Article 
                  key={article._id} 
                  article={article}
                  loggedIn={this.state.loggedIn}
                  articleOptions={this.state.articleOptions}
                />)
            })}
          </NewsFeed>
          {this.switchModals(this.state.showModal)}
        </div>
      ) : (
        <LandingPage toggleLandingPage={this.toggleLandingPage}/>
      )
    );
  }
}

export default App;
