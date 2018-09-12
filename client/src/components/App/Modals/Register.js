import React from 'react';
import { Component } from 'react';
import { Modal, Header, Form, Button, Divider, Icon } from 'semantic-ui-react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      username: '',
      password: '',
      verifyPassword: '',
      // location: '',
      hovering: 'none'
    }
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // make a post request with new user info, save token in local storage
  }

  close = () => {
    this.props.toggleModal('');
  }

  render() { 
    return (
      <Modal 
        open={true}
        onClose={this.close} 
        style={{ minHeight: '350px', padding: '50px', textAlign: 'center' }}>
        <Icon name="close" onClick={this.close}/>
        <Header>CREATE AN ACCOUNT</Header>
        <Modal.Content>
          <Form autoComplete="on">
            <Form.Field required>
              <input onChange={this.handleInput} placeholder="Name" name="name" value={this.state.name}/>
            </Form.Field>
            <Form.Field required>
              <input onChange={this.handleInput} placeholder="Email" type="email" name="email" value={this.state.email}/>
            </Form.Field>
            <Form.Field required>
              <input onChange={this.handleInput} placeholder="Username" name="username" value={this.state.username}/>
            </Form.Field>
            <Form.Field required>
              <input onChange={this.handleInput} placeholder="Password" type="password" name="password" value={this.state.password}/>
            </Form.Field>
            <Form.Field required>
              <input onChange={this.handleInput} placeholder="Verify Password" type="password" name="verifyPassword" value={this.state.verifyPassword}/>
            </Form.Field>
            {/* <Form.Field>
              <input onChange={this.handleInput} placeholder="City, State" name="location" value={this.state.location}/>
            </Form.Field> */}
            <Button type='submit' primary>CREATE ACCOUNT</Button>
          </Form>
          <Divider/>
          <span 
            onClick={() => this.props.toggleModal('signIn')}
            onMouseEnter={() => this.setState({ hovering: 'underline' })}
            onMouseLeave={() => this.setState({ hovering: 'none' })}
            style={{
              textDecoration: this.state.hovering
            }}>
            Sign in
          </span>
        </Modal.Content>
      </Modal>
    );
  }
}

export default Register;