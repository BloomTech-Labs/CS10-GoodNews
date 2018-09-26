import React from 'react';
import { Card, Header, Grid } from 'semantic-ui-react';
import axios from 'axios';
import ArticleOptions from './ArticleOptions';

// Production Server URL or localhost for local testing
const url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SERVER : 'http://localhost:5000';

const Article = (props) => {
  const elapsedMilliseconds = Date.now() - Date.parse(props.article.timestamp);

  const elapsedTime = () => {switch(true) {
    case (elapsedMilliseconds < 1800000):
      return 'Less than an hour ago';
    case (elapsedMilliseconds >= 1800000 && elapsedMilliseconds <= 86400000):
      return `${Math.round(elapsedMilliseconds/(1000*60*60))} hours ago`;
    case (elapsedMilliseconds > 86400000):
      return `${Math.round(elapsedMilliseconds/(1000*60*60*24))} days ago`;
    default:
      return `${elapsedMilliseconds} milliseconds ago`;
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

  return (
    <Card fluid
      style={{ 
        padding: '1em',
        marginBottom: '1em',
        display: 'flex',
        alignItems: 'flex-end',
        maxWidth: '700px'}}>
      {/* {props.articleOptions && <ArticleOptions save={saveArticle}/>} */}
      <Card.Content style={{ borderStyle: 'none' }}>
        <Header href={props.article.url} className='article-title'>
          {props.article.name}
        </Header>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Card.Meta  style={{ marginBottom: '1em' }}>
            <span>{elapsedTime()}</span>
          </Card.Meta>
          {props.articleOptions && <ArticleOptions save={saveArticle}/>}
        </div>
        <Grid>
          <Grid.Row only='tablet computer' columns={1}>
            <Grid.Column textAlign='justified' style={{ lineHeight: '1.6rem' }}>
              {props.article.description}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  );
}
 
export default Article;