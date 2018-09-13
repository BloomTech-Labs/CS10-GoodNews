import React from 'react';
import { Card, Icon, Header, Grid, Divider } from 'semantic-ui-react';

const Article = (props) => {
  return (
    <Card fluid
      style={{ 
        padding: '1em', 
        border: '1px solid #BDBDBD',
        margin: '1em',
        display: 'flex',
        alignItems: 'flex-end',
        // boxShadow: '4px 4px 5px 0 rgba(0,0,0,0.14), 1px 1px 10px 0 rgba(0,0,0,0.12), 2px 2px 4px -1px rgba(0,0,0,0.2)'
      }}>
      <Icon name="ellipsis horizontal" color="grey" floated='right'/>
      <Card.Content>
        <Header href={props.article.url}>
          {props.article.name}
        </Header>
        <Grid>
          <Divider/>
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