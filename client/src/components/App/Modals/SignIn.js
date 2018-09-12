import React from 'react';
import { Component } from 'react';
import { Modal, Grid, Header, Form, Button, Divider, GridColumn, List } from 'semantic-ui-react';

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
  }

  close = () => {
    this.props.toggleModal('');
  }

  render() { 
    return (
      <Modal open={true} size='large' onClose={this.close} style={{minHeight: '350px', padding: '50px'}}>
        <Modal.Content style={{height: '100% !important'}}> 
          <Grid columns={3}>
            <Grid.Column width={7} textAlign="center">
              <Header>LOG IN</Header>
              <Form>
                <Form.Field required>
                  <input onChange={this.handleInput} placeholder="Username" name="username" value={this.state.username}/>
                </Form.Field>
                <Form.Field required>
                  <input onChange={this.handleInput} placeholder="Password" type="password" name="password" value={this.state.password}/>
                </Form.Field>
                <Divider/>
                <Button type='submit' style={{border: '1px solid #BDBDBD'}}>LOG IN</Button>
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
              <Header>CREATE A NEW ACCOUNT</Header>
              <List bulleted>
                <List.Item>Save articles for later</List.Item>
                <List.Item>Get weather data for your location</List.Item>
                <List.Item>Comment on articles</List.Item>
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