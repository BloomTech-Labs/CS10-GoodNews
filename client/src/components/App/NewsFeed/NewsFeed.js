import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import Article from './Article/Article';

class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
  }

  componentWillMount() {
    this.fetchArticles()
  }

  fetchArticles = () => {
    axios.get('http://localhost:5000/api/article')
      .then( articles => {
        this.setState({ articles: articles.data });
      })
      .catch( err => {
        console.log(err.message)
      })
  }

  render() { 
    return (
      <Container text style={{ 
          minHeight: '100vh',
          padding: '100px 1em',
        }}>
        {this.state.articles.map( article => {
          return <Article key={article._id} article={article}/>
        })}
      </Container>
    );
  }
}
 
export default NewsFeed;