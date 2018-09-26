import React, { Component } from 'react';
import { Modal, Header, Grid, Input } from 'semantic-ui-react';
import axios from 'axios';
import ChangeSettings from './ChangeSettings';

// Production Server URL or localhost for local testing
const url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SERVER : 'http://localhost:5000';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      first: null,
      last: null,
      username: null,
      email: null,
      changeName: false,
      changeUsername: false,
      changeEmail: false,
      // changePassword: false,
      // currentPassword: '',
      // newPassword: '',
      // verifyNewPassword: '',
      // failPassword: false
    }
  }

  componentDidMount() {
    this.getUser();
    console.log(this.state)
  }

  getUser = () => {
    const config = {
      headers: {
        'authorization': localStorage.getItem('auth-token'),
        'userid': localStorage.getItem("userid")
      }
    }
    axios.get(`${url}/api/user/logged`, config)
      .then( user => {
        console.log(user.data);
        this.setState({
          first: user.data.name.first,
          last: user.data.name.last,
          username: user.data.username,
          email: user.data.email
        })
      })
      .catch( err => console.log(err))
  }

  toggleEdit = (field) => {
    this.setState(prevState => ({ [field]: !prevState[field]}))
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e, stateProp, stateProp2=null) => {
    e.preventDefault();
    console.log('arg 1:', stateProp);
    console.log('arg 2:', stateProp2);
    let userInfo = this.state[stateProp];
    console.log('state property: ', userInfo);
    let user = {[stateProp]: userInfo};
    if (stateProp2) {
      user = {
        name: {
          [stateProp]: userInfo,
          [stateProp2]: this.state[stateProp2]
        }
      }
    }
    this.saveUser(user);
  }

  saveUser = (user) => {
    console.log('saving user');
    const config = {
      headers: {
        'authorization': localStorage.getItem('auth-token'),
        'userid': localStorage.getItem("userid")
      }
    }
    axios.put(`${url}/api/user/logged`, user, config)
      .then( res => {
        console.log(res.data)
        this.getUser()
      })
      .catch(err => console.log(err.message))
  }

  render() { 
    return (
      <Modal closeIcon open={true} centered={false}
        onClose={() => this.props.toggleModal('')}
        style={{ minHeight: '350px', padding: '2em' }}>
        <Header size="large" textAlign='center'>SETTINGS</Header>
        <Modal.Content>
          <Grid>
            {this.state.first && 
              <React.Fragment>
                <ChangeSettings 
                  userInfoTitle='Name'
                  userInfo={`${this.state.first} ${this.state.last}`}
                  name='first'
                  value={this.state.first}
                  editing={this.state.changeName}
                  toggleEdit={()=>this.toggleEdit('changeName')}
                  saveUser={this.saveUser}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  name2='last'
                  value2={this.state.last}>
                </ChangeSettings>
                <ChangeSettings 
                  userInfoTitle='Username'
                  userInfo={this.state.username}
                  name='username'
                  value={this.state.username}
                  editing={this.state.changeUsername}
                  toggleEdit={()=>this.toggleEdit('changeUsername')}
                  saveUser={this.saveUser}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  >
                </ChangeSettings>
                <ChangeSettings 
                  userInfoTitle='Email'
                  userInfo={this.state.email}
                  name='email'
                  value={this.state.email}
                  editing={this.state.changeEmail}
                  toggleEdit={()=>this.toggleEdit('changeEmail')}
                  saveUser={this.saveUser}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  type='email'>
                </ChangeSettings>
              </React.Fragment>
            }
          </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}
 
export default Settings;