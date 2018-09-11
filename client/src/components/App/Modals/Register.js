import React from 'react';
import { Component } from 'react';
import { Modal, Header, Form, Button } from 'semantic-ui-react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      username: '',
      password: '',
      verifyPassword: '',
      hovering: 'none'
    }
  }

  close = () => {
    this.props.toggleModal('');
  }

  render() { 
    return (
      <Modal open={true} onClose={this.close}>
        <Header>CREATE A NEW ACCOUNT</Header>
        <Modal.Content>
          <Form>
            <Form.Field required>
              <input placeholder="Name" name="name" value={this.state.name}/>
            </Form.Field>
            <Form.Field required>
              <input placeholder="Email" type="email" name="email" value={this.state.email}/>
            </Form.Field>
            <Form.Field required>
              <input placeholder="Username" name="username" value={this.state.username}/>
            </Form.Field>
            <Form.Field required>
              <input placeholder="Password" type="password" name="password" value={this.state.password}/>
            </Form.Field>
            <Form.Field required>
              <input placeholder="Verify Password" type="password" name="verifyPassword" value={this.state.verifyPassword}/>
            </Form.Field>
            <Button type='submit'>CREATE ACCOUNT</Button>
          </Form>
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