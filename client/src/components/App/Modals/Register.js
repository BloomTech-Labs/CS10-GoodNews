import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import { Modal, Header, Form, Button, Divider, Icon } from 'semantic-ui-react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      verifyPassword: '',
      // location: '',
      hovering: 'none',
      failPassword: false,
      failRegister: false,
    }
  }

  handleInput = (e) => {
    this.setState({ 
      [e.target.name]: e.target.value, 
      failRegister: false 
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password !== this.state.verifyPassword) {
      this.setState({ failPassword: true });
    } else {
      this.setState({ failPassword: false });
      const name = {
        first: this.state.firstName,
        last: this.state.lastName,
      }
      const newUser = {
        name: name,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }
      this.createUser(newUser);
    }
  }

  createUser = (user) => {
    axios.post(`http://localhost:5000/api/user/register`, user)
      .then( user => {
        localStorage.setItem("auth-token", user.data.token);
        this.close();
      })
      .catch( err => {
        this.setState({ failRegister: true })
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
        style={{ minHeight: '350px', padding: '50px', textAlign: 'center' }}>
        <Icon name="close" onClick={this.close}/>
        <Header size="large">CREATE AN ACCOUNT</Header>
        <Modal.Content>
          {/* Display message when form submission has failed */}
          {this.state.failRegister && <span style={{color:'red'}}>Unable to create account</span>}
          <Form onSubmit={this.handleSubmit}>
          <Form.Field required>
              <input onChange={this.handleInput} placeholder="First Name" name="firstName" value={this.state.firstName}/>
            </Form.Field>
            <Form.Field required>
              <input onChange={this.handleInput} placeholder="Last Name" name="lastName" value={this.state.lastName}/>
            </Form.Field>
            <Form.Field required>
              <input onChange={this.handleInput} placeholder="Email" type="email" name="email" value={this.state.email}/>
            </Form.Field>
            <Form.Field required>
              <input onChange={this.handleInput} placeholder="Username" name="username" value={this.state.username}/>
            </Form.Field>
            <Form.Field required>
              {/* Display message when passwords do not match */}
              {this.state.failPassword && <span style={{color:'red'}}>Passwords do not match</span>}
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