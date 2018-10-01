import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Weather from '../Widgets/Weather'

const NewsFeed = (props) => {
  return (
    <Grid columns={16} padded='horizontally' stackable reversed='mobile'
      style={{ padding: '120px 15px 0px 15px', width: '100%', maxWidth: '1800px' }}>
      <Grid.Column widescreen={4} largeScreen={4} computer={2} only='computer'/>
      <Grid.Column widescreen={8} largeScreen={8} computer={8} tablet={9} mobile={16}>
        <Container fluid
          style={{ 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '1.1rem'
          }}>
          {props.children}
        </Container>
      </Grid.Column>
      <Grid.Column widescreen={4} largeScreen={4} computer={6} tablet={7}>
        <Weather/>
      </Grid.Column>
    </Grid>
  );
}
 
export default NewsFeed;