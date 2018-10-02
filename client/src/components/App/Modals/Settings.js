import React, { Component } from 'react';
import { Modal, Header, Grid } from 'semantic-ui-react';
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
      changePassword: false,
      currentPassword: '',
      password: '',
      verifyNewPassword: '',
      failPassword: false,
      failSave: false
    }
  }

  componentDidMount() {
    this.getUser();
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
        this.setState({
          first: user.data.name.first,
          last: user.data.name.last,
          username: user.data.username,
          email: user.data.email
        })
      })
      .catch( err => console.log(err))
  }

  updateUser = (updatedUser) => {
    this.setState({
      first: updatedUser.data.name.first,
      last: updatedUser.data.name.last,
      username: updatedUser.data.username,
      email: updatedUser.data.email
    })
  }

  toggleEdit = (field) => {
    this.setState(prevState => ({ [field]: !prevState[field]}))
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, failSave: false });
  }

  handleSubmit = (e, stateProp, successEvent, stateProp2=null, stateProp3=null) => {
    e.preventDefault();
    let userInfo = this.state[stateProp];
    let user = {[stateProp]: userInfo};
    if (stateProp === 'password') {
      if (this.state.password !== this.state.verifyNewPassword) {
        this.setState({ failPassword: true })
        return;
      } else {
        this.setState({ failPassword: false })
        user = { 
          [stateProp]: this.state[stateProp], 
          [stateProp3]: this.state[stateProp3]
        }
      }
    }
    if (stateProp === 'first') {
      user = {
        name: {
          [stateProp]: userInfo,
          [stateProp2]: this.state[stateProp2]
        }
      }
    }
    this.saveUser(user, successEvent);
  }

  saveUser = (user, successEvent) => {
    const config = {
      headers: {
        'authorization': localStorage.getItem('auth-token'),
        'userid': localStorage.getItem("userid")
      }
    }
    axios.put(`${url}/api/user/logged`, user, config)
      .then( res => {
        successEvent()
        this.updateUser(res)
      })
      .catch( err => {
        this.setState({ failSave: true })
      })
  }

  render() { 
    return (
      <Modal closeIcon open={true} centered={false}
        onClose={() => this.props.toggleModal('')}
        style={{ minHeight: '350px', padding: '2em' }}>
        <Modal.Content>
          <Header size="large" textAlign='center'>SETTINGS</Header>
          <Grid>
            {this.state.first && 
              <React.Fragment>
                <ChangeSettings 
                  userInfoTitle='Name'
                  userInfo={`${this.state.first} ${this.state.last}`}
                  name='first'
                  label='First Name'
                  value={this.state.first}
                  editing={this.state.changeName}
                  toggleEdit={()=>this.toggleEdit('changeName')}
                  saveUser={this.saveUser}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  name2='last'
                  label2='Last Name'
                  value2={this.state.last}
                  failSave={this.state.failSave}>
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
                  failSave={this.state.failSave}>
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
                  type='email'
                  failSave={this.state.failSave}>
                </ChangeSettings>
                <ChangeSettings 
                  userInfoTitle='Password'
                  userInfo='**********'
                  name='password'
                  label='New'
                  value={this.state.password}
                  editing={this.state.changePassword}
                  toggleEdit={()=>this.toggleEdit('changePassword')}
                  saveUser={this.saveUser}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  type='password'
                  name2='verifyNewPassword'
                  label2='Re-type New'
                  value2={this.state.verifyNewPassword}
                  name3='currentPassword'
                  label3='Current'
                  value3={this.state.currentPassword}
                  failPassword={this.state.failPassword}
                  failSave={this.state.failSave}>
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