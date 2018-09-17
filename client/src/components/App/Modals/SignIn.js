import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import { Modal, Grid, Header, Form, Button, Divider, List, Icon } from 'semantic-ui-react';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      failLogin: false
    }
  }

  handleInput = (e) => {
    this.setState({ 
      [e.target.name]: e.target.value,
      failLogin: false
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ failPassword: false });
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    this.loginUser(user);
  }

  loginUser = (user) => {
    // const serverUrl = process.env.SERVER_URL + '/api/user/login';
    const serverUrl = 'http://localhost:5000/api/user/login'
    axios.post(serverUrl, user)
      .then( user => {
        localStorage.setItem("auth-token", user.data.token);
        localStorage.setItem("userid", user.data.userid);
        this.props.login();
        this.close();
      })
      .catch( err => {
        this.setState({ failLogin: true })
      })
  }

  close = () => {
    this.props.toggleModal('');
  }

  render() { 
    return (
      <Modal 
        open={true} 
        onClose={this.close} 
        style={{minHeight: '350px', padding: '2em'}}>
        <Icon name="close" onClick={this.close}/>
        <Modal.Content> 
          <Grid columns={3} stackable divided>
            <Grid.Column
              only='tablet computer'
              width={7}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <Header size="large" textAlign="center">CREATE AN ACCOUNT</Header>
              <List bulleted>
                <List.Item>Save articles (coming soon)</List.Item>
                <List.Item>Get the weather in location (coming soon)</List.Item>
                <List.Item>Comment on articles (coming soon)</List.Item>
              </List>
              <Divider/>
              <Button primary onClick={() => this.props.toggleModal('register')}>
                CREATE ACCOUNT
              </Button>
            </Grid.Column>
            <Grid.Column width={2} only='tablet computer'>
              <Divider vertical>OR</Divider>
            </Grid.Column>
            <Grid.Column
              width={7}
              textAlign="center"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <Header size="large">SIGN IN</Header>
              {/* Display message when form submission has failed */}
              {this.state.failLogin && <span style={{color:'red'}}>Username or Password is incorrect</span>}
              <Form onSubmit={this.handleSubmit}>
                <Form.Field required>
                  <input onChange={this.handleInput} placeholder="Username" name="username" value={this.state.username}/>
                </Form.Field>
                <Form.Field required>
                  <input onChange={this.handleInput} placeholder="Password" type="password" name="password" value={this.state.password}/>
                </Form.Field>
                <Divider/>
                <Button type='submit' style={{border: '1px solid #BDBDBD'}}>SIGN IN</Button>
              </Form>
            </Grid.Column>
            <Grid.Row only="mobile" centered onClick={() => this.props.toggleModal('register')}>
              Sign up
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}

export default SignIn;