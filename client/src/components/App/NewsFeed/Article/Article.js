import React from 'react';
import { Card, Header, Grid, Image } from 'semantic-ui-react';
import axios from 'axios';
import ArticleOptions from './ArticleOptions';

// Production Server URL or localhost for local testing
const url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SERVER : 'http://localhost:5000';
const urlDs = 'https://lab7goodnews-ds.herokuapp.com/stories'

const Article = (props) => {
  const elapsedMilliseconds = Date.now() - Date.parse(props.article.timestamp);

  const elapsedTime = () => {switch(true) {
    case (elapsedMilliseconds < 1800000):
      return 'Less than an hour ago';
    case (elapsedMilliseconds >= 1800000 && elapsedMilliseconds <= 2700000):
      return '1 hour ago';
    case (elapsedMilliseconds > 2700000 && elapsedMilliseconds <= 86400000):
      return `${Math.round(elapsedMilliseconds/(1000*60*60))} hours ago`;
    case (elapsedMilliseconds > 86400000 && elapsedMilliseconds <= 172800000):
      return '1 day ago';
    case (elapsedMilliseconds > 172800000 && elapsedMilliseconds <= 604800000):
      return `${Math.round(elapsedMilliseconds/(1000*60*60*24))} days ago`;
    case (elapsedMilliseconds > 604800000 && elapsedMilliseconds <= 1814400000):
      return '1 week ago';
    case (elapsedMilliseconds > 1814400000):
      return `${Math.round(elapsedMilliseconds/(1000*60*60*24*7))} weeks ago`;
    default:
      return 'Some time ago...';
  }}

  const saveArticle = () => {
    const id = props.article._id
    const config = {
      headers: {
        'authorization': localStorage.getItem('auth-token'),
        'userid': localStorage.getItem("userid")
      }
    }
    axios.put(`${url}/api/article/${id}/add`, null, config)
      .then( res => {
        console.log('saved')
      })
      .catch( err => {
        console.log('failed')
        console.log(err)
      })
  }

  const removeArticle = () => {
    const id = props.article._id
    const config = {
      headers: {
        'authorization': localStorage.getItem('auth-token'),
        'userid': localStorage.getItem("userid")
      }
    }
    axios.put(`${url}/api/article/${id}/del`, null, config)
      .then( res => {
        console.log('removed')
      })
      .catch( err => {
        console.log('failed')
        console.log(err)
      })
  }

  const reportArticle = (clickbait) => {
    const user_id = localStorage.getItem('userid')
    const report = { user_id, clickbait }
    axios.post(`${urlDs}/${props.article.id}`, report)
  }

  return (
    <Card fluid
      style={{ 
        padding: '1em',
        marginBottom: '1em',
        display: 'flex',
        alignItems: 'flex-end',
        maxWidth: '700px'}}>
      {(props.loggedIn && props.articleOptions==='saved') && 
        <ArticleOptions
          remove={removeArticle} 
          articleOptions={props.articleOptions}/>}
      <Card.Content>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Header href={props.article.url} className='article-title'>
            {props.article.name}
          </Header>
          {props.article.imageurl &&
            <Image fluid verticalAlign='middle' floated='right' size='small' src={props.article.imageurl}/>}
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Card.Meta  style={{ marginBottom: '1em' }}>
            <span>{elapsedTime()}</span>
          </Card.Meta>
          {(props.loggedIn && props.articleOptions==='all') && 
            <ArticleOptions 
              articleOptions={props.articleOptions} 
              save={saveArticle}
              report={reportArticle}/>}
        </div>
        <Grid>
          <Grid.Row only='tablet computer' columns={1}>
            <Grid.Column textAlign='justified' style={{ lineHeight: '1.6rem' }}>
              {props.article.description}
            </Grid.Column>
          </Grid.Row>
          {(props.loggedIn && props.articleOptions==='clickbait') &&
          <ArticleOptions
            articleOptions={props.articleOptions}
            report={reportArticle}/>}
        </Grid>
      </Card.Content>
    </Card>
  );
}
 
export default Article;