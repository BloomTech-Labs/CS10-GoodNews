import React, { Component } from 'react';
import { Card, Header, Grid, Image } from 'semantic-ui-react';
import axios from 'axios';
import ArticleOptions from './ArticleOptions';

// Production Server URL or localhost for local testing
const url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SERVER : 'http://localhost:5000';
const urlDs = 'https://lab7goodnews-ds.herokuapp.com/stories'

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickbaitModal: false,
      nonClickbaitModal: false,
      saved: false,
      reported: false
    }
  }

  elapsedTime = () => {
    let elapsedMilliseconds = Date.now() - Date.parse(this.props.article.timestamp);
    const currentDate = new Date(elapsedMilliseconds);
    const offset = currentDate.getTimezoneOffset() *60*1000
    elapsedMilliseconds = elapsedMilliseconds+offset
    switch(true) {
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
        return `${elapsedMilliseconds} milliseconds ago`;
    }
  }

  saveArticle = () => {
    const id = this.props.article._id
    this.setState({ saved: true })
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

  removeArticle = () => {
    const id = this.props.article._id
    const config = {
      headers: {
        'authorization': localStorage.getItem('auth-token'),
        'userid': localStorage.getItem("userid")
      }
    }
    axios.put(`${url}/api/article/${id}/del`, null, config)
      .then( res => {
        this.props.refreshSavedArticles(res.data.saved_articles)
        console.log(res)
      })
      .catch( err => {
        console.log('failed')
        console.log(err)
      })
  }

  reportArticle = (clickbait) => {
    this.setState({ reported: true })
    const modal = clickbait ? 'clickbaitModal' : 'nonClickbaitModal'
    const user_id = localStorage.getItem('userid')
    const report = { user_id, clickbait }
    axios.post(`${urlDs}/${this.props.article.id}`, report)
      .then(res => this.closeModal(modal))
      .catch(err => console.log(err))
  }

  closeModal = (modal) => this.setState({ [modal]: false })

  openModal = (modal) => this.setState({ [modal]: true })

  render() { 
    return (
      <Card fluid
        style={{ 
          padding: '1em',
          marginBottom: '1em',
          display: 'flex',
          alignItems: 'flex-end',
          maxWidth: '700px'}}>
        {(this.props.loggedIn && this.props.articleOptions==='saved') && 
          <ArticleOptions
            remove={this.removeArticle} 
            articleOptions={this.props.articleOptions}/>}
        <Card.Content>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Header href={this.props.article.url} className='article-title'>
              {this.props.article.name}
            </Header>
            {this.props.article.imageurl &&
              <Image 
                style={{ maxHeight: '90px', width: 'auto' }} 
                verticalAlign='middle' 
                floated='right' 
                size='small' 
                src={this.props.article.imageurl}/>}
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Card.Meta  style={{ marginBottom: '1em' }}>
              <span>{this.elapsedTime()}</span>
            </Card.Meta>
            {(this.props.loggedIn && this.props.articleOptions==='all') && 
              <ArticleOptions
                clickbaitModal={this.state.clickbaitModal}
                saved={this.state.saved}
                reported={this.state.reported} 
                articleOptions={this.props.articleOptions} 
                save={this.saveArticle}
                report={this.reportArticle}
                openModal={this.openModal}
                closeModal={this.closeModal}/>}
          </div>
          <Grid>
            <Grid.Row only='tablet computer' columns={1}>
              <Grid.Column textAlign='justified' style={{ lineHeight: '1.6rem' }}>
                {this.props.article.description}
              </Grid.Column>
            </Grid.Row>
            {(this.props.loggedIn && this.props.articleOptions==='clickbait') &&
            <ArticleOptions
              clickbaitModal={this.state.clickbaitModal}
              nonClickbaitModal={this.state.nonClickbaitModal}
              closeModal={this.closeModal}
              openModal={this.openModal}
              articleOptions={this.props.articleOptions}
              report={this.reportArticle}/>}
          </Grid>
        </Card.Content>
      </Card>
    );
  }
}
 
export default Article;

// const Article = (props) => {
//   const elapsedMilliseconds = Date.now() - Date.parse(props.article.timestamp);

//   const elapsedTime = () => {switch(true) {
//     case (elapsedMilliseconds < 1800000):
//       return 'Less than an hour ago';
//     case (elapsedMilliseconds >= 1800000 && elapsedMilliseconds <= 2700000):
//       return '1 hour ago';
//     case (elapsedMilliseconds > 2700000 && elapsedMilliseconds <= 86400000):
//       return `${Math.round(elapsedMilliseconds/(1000*60*60))} hours ago`;
//     case (elapsedMilliseconds > 86400000 && elapsedMilliseconds <= 172800000):
//       return '1 day ago';
//     case (elapsedMilliseconds > 172800000 && elapsedMilliseconds <= 604800000):
//       return `${Math.round(elapsedMilliseconds/(1000*60*60*24))} days ago`;
//     case (elapsedMilliseconds > 604800000 && elapsedMilliseconds <= 1814400000):
//       return '1 week ago';
//     case (elapsedMilliseconds > 1814400000):
//       return `${Math.round(elapsedMilliseconds/(1000*60*60*24*7))} weeks ago`;
//     default:
//       return 'Some time ago...';
//   }}

//   const saveArticle = () => {
//     const id = props.article._id
//     const config = {
//       headers: {
//         'authorization': localStorage.getItem('auth-token'),
//         'userid': localStorage.getItem("userid")
//       }
//     }
//     axios.put(`${url}/api/article/${id}/add`, null, config)
//       .then( res => {
//         console.log('saved')
//       })
//       .catch( err => {
//         console.log('failed')
//         console.log(err)
//       })
//   }

//   const removeArticle = () => {
//     const id = props.article._id
//     const config = {
//       headers: {
//         'authorization': localStorage.getItem('auth-token'),
//         'userid': localStorage.getItem("userid")
//       }
//     }
//     axios.put(`${url}/api/article/${id}/del`, null, config)
//       .then( res => {
//         props.refreshSavedArticles(res.data.saved_articles)
//         console.log(res)
//       })
//       .catch( err => {
//         console.log('failed')
//         console.log(err)
//       })
//   }

//   const reportArticle = (clickbait) => {
//     const user_id = localStorage.getItem('userid')
//     const report = { user_id, clickbait }
//     axios.post(`${urlDs}/${props.article.id}`, report)
//   }

//   return (
//     <Card fluid
//       style={{ 
//         padding: '1em',
//         marginBottom: '1em',
//         display: 'flex',
//         alignItems: 'flex-end',
//         maxWidth: '700px'}}>
//       {(props.loggedIn && props.articleOptions==='saved') && 
//         <ArticleOptions
//           remove={removeArticle} 
//           articleOptions={props.articleOptions}/>}
//       <Card.Content>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
//           <Header href={props.article.url} className='article-title'>
//             {props.article.name}
//           </Header>
//           {props.article.imageurl &&
//             <Image style={{ maxHeight: '90px', width: 'auto' }} verticalAlign='middle' floated='right' size='small' src={props.article.imageurl}/>}
//         </div>
//         <div style={{display: 'flex', justifyContent: 'space-between'}}>
//           <Card.Meta  style={{ marginBottom: '1em' }}>
//             <span>{elapsedTime()}</span>
//           </Card.Meta>
//           {(props.loggedIn && props.articleOptions==='all') && 
//             <ArticleOptions 
//               articleOptions={props.articleOptions} 
//               save={saveArticle}
//               report={reportArticle}/>}
//         </div>
//         <Grid>
//           <Grid.Row only='tablet computer' columns={1}>
//             <Grid.Column textAlign='justified' style={{ lineHeight: '1.6rem' }}>
//               {props.article.description}
//             </Grid.Column>
//           </Grid.Row>
//           {(props.loggedIn && props.articleOptions==='clickbait') &&
//           <ArticleOptions
//             articleOptions={props.articleOptions}
//             report={reportArticle}/>}
//         </Grid>
//       </Card.Content>
//     </Card>
//   );
// }
 
// export default Article;