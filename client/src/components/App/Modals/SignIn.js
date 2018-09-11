import React from 'react';
import { Component } from 'react';
import { Modal, Header, Form, Button, Divider } from 'semantic-ui-react';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      hovering: 'none'
    }
  }

  close = () => {
    this.props.toggleModal('');
  }

  render() { 
    return (
      <Modal open={true} onClose={this.close}>
        <Header>LOG IN</Header>
        <Modal.Content>
          <Form>
            <Form.Field required>
              <label>Username:</label>
              <input name="username" value={this.state.username}/>
            </Form.Field>
            <Form.Field required>
              <label>Password:</label>
              <input type="password" name="password" value={this.state.password}/>
            </Form.Field>
            <Button type='submit'>LOG IN</Button>
          </Form>
          <span 
            onClick={() => this.props.toggleModal('register')}
            onMouseEnter={() => this.setState({ hovering: 'underline' })}
            onMouseLeave={() => this.setState({ hovering: 'none' })}
            style={{
              textDecoration: this.state.hovering
            }}>
            <Divider />
            Sign up
          </span>
        </Modal.Content>
      </Modal>
    );
  }
}

export default SignIn;