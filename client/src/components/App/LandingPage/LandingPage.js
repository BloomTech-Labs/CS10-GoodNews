import React from 'react';
import { Grid, Icon, Button } from 'semantic-ui-react';

const LandingPage = (props) => {
  return (
    <Grid style={{ justifyContent: 'center' }}>
      <Grid.Row
        className='jumbotron' 
        style={{
          backgroundColor: '#37bc9b',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <div style={{ backgroundColor: 'white', padding: '2em' }}>
            <span className='app-name' style={{color: '#37bc9b', paddingRight: '0.2em'}}>
              GOOD
            </span>
            <span className='app-name' style={{color: '#3d3d3d'}}>
              NEWS
            </span>
        </div>
        <span className='app-description'>A CLICKBAIT-FREE NEWS AGGREGATOR</span>
      </Grid.Row>
      <Grid.Row 
        className='about-section'
        centered columns='equal'>
        <Grid.Column computer={1} mobile={6}>
          <Icon name='newspaper outline' size='huge' color='grey'/>
        </Grid.Column>
        <Grid.Column className='about-app'>
          You can get news from a variety of sources without having to deal with clickbait.
        </Grid.Column>
        <Grid.Column computer={1} mobile={6}>
          <Icon name='lab' size='huge' color='grey'/>
        </Grid.Column>
        <Grid.Column className='about-app'>
          We used machine learning to identify clickbait articles so you just get the news.
        </Grid.Column>
        <Grid.Column computer={1} mobile={6}>
          <Icon name='group' size='huge' color='grey'/>
        </Grid.Column>
        <Grid.Column className='about-app'>
          Created by a team of Data Science and Web Development students at Lambda School.
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Button primary size='huge' 
          style={{ backgroundColor: '#37bc9b' }}
          onClick={props.toggleLandingPage}>GET STARTED</Button>
      </Grid.Row>
    </Grid>
  );
}
 
export default LandingPage;