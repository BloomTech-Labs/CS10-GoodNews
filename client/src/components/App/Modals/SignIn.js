import React from 'react';
import { Component } from 'react';
import { Modal, Grid, Header, Form, Button, Divider, List, Icon } from 'semantic-ui-react';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      hovering: 'none'
    }
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // make a post request with username and password, save token in local storage
    console.log("submitted")
  }

  close = () => {
    this.props.toggleModal('');
  }

  render() { 
    return (
      <Modal open={true} onClose={this.close} style={{minHeight: '350px', padding: '50px'}}>
        <Icon name="close" onClick={this.close}/>
        <Modal.Content> 
          <Grid columns={3} stackable divided>
            <Grid.Column
              width={7}
              textAlign="center"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <Header>SIGN IN</Header>
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
            <Grid.Column width={2}>
              <Divider vertical>OR</Divider>
            </Grid.Column>
            <Grid.Column
              width={7}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <Header>CREATE AN ACCOUNT</Header>
              <List bulleted>
                <List.Item>Save articles (coming soon)</List.Item>
                <List.Item>Get the weather in location (coming soon)</List.Item>
                <List.Item>Comment on articles (coming soon)</List.Item>
              </List>
              <Divider/>
              <Button primary onClick={() => this.props.toggleModal('register')}>CREATE ACCOUNT</Button>
            </Grid.Column>
          </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}

export default SignIn;