import React from 'react';
import { Container } from 'semantic-ui-react';

const NewsFeed = (props) => {
  return (
    <Container text style={{ 
        minHeight: '100vh',
        padding: '100px 1em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      {props.children}
    </Container>
  );
}
 
export default NewsFeed;