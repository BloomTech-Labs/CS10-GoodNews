import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';

class MainMenu extends Component {

  shouldComponentUpdate(nextProps) {
    const loggedIn = this.props.loggedIn !== nextProps.loggedIn;
    return loggedIn;
  }

  handleTopicClick = (e) => {
    const topic = e.target.innerHTML;
    this.props.switchArticles('trending', topic);
  }

  render() { 
    return (
      <Menu className='main-menu' borderless secondary vertical fixed='top'>
        {this.props.searchBar}  
        <Menu.Item onClick={()=>this.props.switchArticles('all')} style={{ marginTop: '10px' }}>
          <Icon name='newspaper' size='large' color='grey'/>
          All articles
        </Menu.Item>
        {this.props.loggedIn &&
          <Menu.Item onClick={()=>this.props.switchArticles('saved')}>
            <Icon name='list ul' size='large' color='grey'/>
            Reading list
          </Menu.Item>}
        <Menu.Item>
          <Icon name='thermometer three quarters' size='large' color='grey'/>
          Trending topics:
          <Menu secondary vertical 
            className='trending-topics'>
            {this.props.trendingTopics.map(topic => {
              return (<Menu.Item 
                key={topic}
                onClick={this.handleTopicClick}>
                {topic}
              </Menu.Item>)
            })}
          </Menu>
        </Menu.Item>
        <Menu.Item onClick={this.props.toggleLandingPage}>
          <Icon name='info circle' size='large' color='grey'/>
          About Good News
        </Menu.Item>
        {this.props.loggedIn &&
          <Menu.Item onClick={()=>this.props.switchArticles('clickbait')}>
            <Icon name='edit' size='large' color='grey'/>
            Evaluate clickbait
          </Menu.Item>}
      </Menu>
    );
  }
}
 
export default MainMenu;