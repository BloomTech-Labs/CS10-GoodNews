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
      user: null,
      firstName: null,
      lastName: null,
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
          user: {
            name: user.data.name,
            username: user.data.username,
            email: user.data.email
          },
          firstName: user.data.name.first,
          lastName: user.data.name.last,
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

  saveUser = (user) => {
    console.log('saving user');
    const config = {
      headers: {
        'authorization': localStorage.getItem('auth-token'),
        'userid': localStorage.getItem("userid")
      }
    }
    let savedUser = this.state.user;
    const key = Object.keys(user)[0]
    savedUser[key] = user[key]
    console.log(savedUser)
    axios.put(`${url}/api/user/logged`, savedUser, config)
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
            {this.state.firstName && 
              <React.Fragment>
                <ChangeSettings 
                  userInfo={['Name', `${this.state.firstName} ${this.state.lastName}`, 'firstName']}
                  editing={this.state.changeName}
                  toggleEdit={()=>this.toggleEdit('changeName')}
                  saveUser={this.saveUser}
                  extraInfo={this.state.lastName}>
                </ChangeSettings>
                <ChangeSettings 
                  userInfo={['Username', this.state.username, 'username']}
                  editing={this.state.changeUsername}
                  toggleEdit={()=>this.toggleEdit('changeUsername')}
                  saveUser={this.saveUser}
                  >
                </ChangeSettings>
                <ChangeSettings 
                  userInfo={['Email', this.state.email, 'email']}
                  editing={this.state.changeEmail}
                  toggleEdit={()=>this.toggleEdit('changeEmail')}
                  saveUser={this.saveUser}
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