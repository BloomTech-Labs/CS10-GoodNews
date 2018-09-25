import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
// import ReactWeather from 'react-open-weather';
import Weather from '../Widgets/Weather'

const NewsFeed = (props) => {
  return (
    <Grid columns={16} padded='horizontally' 
      style={{ paddingTop: '120px', width: '100%', maxWidth: '1800px' }}>
      <Grid.Column computer={4} only='computer'/>
      <Grid.Column computer={8} tablet={10} mobile={16}>
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
      <Grid.Column computer={4} tablet={6} only='computer tablet'>
        <Weather/>
        {/* <ReactWeather
        forecast="5days"
        apikey="61e020a41ccd4b1d945190151182409"
        type="city"
        city="Munich"/> */}
      </Grid.Column>
    </Grid>
  );
}
 
export default NewsFeed;