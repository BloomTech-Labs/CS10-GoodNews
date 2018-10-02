import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';

const MainMenu = (props) => {
  const handleTopicClick = (e) => {
    const topic = e.target.innerHTML;
    props.switchArticles('trending', topic);
  }

  return (
    <Menu className='main-menu' borderless secondary vertical fixed='top'>
      {props.searchBar}  
      <Menu.Item onClick={()=>props.switchArticles('all')} style={{ marginTop: '10px' }}>
        <Icon name='newspaper' size='large' color='grey'/>
        All articles
      </Menu.Item>
      {props.loggedIn &&
        <Menu.Item onClick={()=>props.switchArticles('saved')}>
          <Icon name='list ul' size='large' color='grey'/>
          Reading list
        </Menu.Item>}
      <Menu.Item>
        <Icon name='thermometer three quarters' size='large' color='grey'/>
        Trending topics:
        <Menu secondary vertical 
          items={props.trendingTopics}
          className='trending-topics'
          onItemClick={handleTopicClick}/>
      </Menu.Item>
      <Menu.Item onClick={props.toggleLandingPage}>
        <Icon name='info circle' size='large' color='grey'/>
        About Good News
      </Menu.Item>
      {props.loggedIn &&
        <Menu.Item onClick={()=>props.switchArticles('clickbait')}>
          <Icon name='edit' size='large' color='grey'/>
          Evaluate clickbait
        </Menu.Item>}
    </Menu>
  );
}
 
export default MainMenu;