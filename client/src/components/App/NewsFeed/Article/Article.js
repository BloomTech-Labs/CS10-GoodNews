import React from 'react';
import { Card, Icon, Header, Grid } from 'semantic-ui-react';

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

  return (
    <Card fluid
      style={{ 
        padding: '1em',
        margin: '1em',
        display: 'flex',
        alignItems: 'flex-end',
        // boxShadow: '4px 4px 5px 0 rgba(0,0,0,0.14), 1px 1px 10px 0 rgba(0,0,0,0.12), 2px 2px 4px -1px rgba(0,0,0,0.2)'
      }}>
      <Icon name="ellipsis horizontal" color="grey"/>
      <Card.Content style={{ borderStyle: 'none' }}>
        <Header href={props.article.url}>
          {props.article.name}
        </Header>
        <Card.Meta  style={{ marginBottom: '1em' }}>
          <span>{elapsedTime()}</span>
        </Card.Meta>
        <Grid>
          <Grid.Row only='tablet computer' columns={1}>
            <Grid.Column>
              {props.article.description}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  );
}
 
export default Article;