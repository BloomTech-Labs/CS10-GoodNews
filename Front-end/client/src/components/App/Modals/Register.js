import React from "react";
import { Component } from "react";
import axios from "axios";
import { Modal, Header, Form, Button } from "semantic-ui-react";

// Production Server URL or localhost for local testing
const url =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_SERVER
    : "http://localhost:5000";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      verifyPassword: "",
      failPassword: false,
      failRegister: false,
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
      failRegister: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.password !== this.state.verifyPassword) {
      this.setState({ failPassword: true });
    } else {
      this.setState({ failPassword: false });
      const name = {
        first: this.state.firstName,
        last: this.state.lastName,
      };
      const newUser = {
        name: name,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      };
      this.createUser(newUser);
    }
  };

  createUser = user => {
    axios
      .post(`${url}/api/user/register`, user)
      .then(user => {
        localStorage.setItem("auth-token", user.data.token);
        localStorage.setItem("userid", user.data.user._id);
        this.props.login();
        this.close();
      })
      .catch(err => {
        this.setState({ failRegister: true });
        console.log(err);
      });
  };

  registerPassport = socialMedia => {
    axios
      .get(`${url}/auth/${socialMedia}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  close = () => {
    this.props.toggleModal("");
  };

  render() {
    return (
      <Modal
        closeIcon
        open
        onClose={this.close}
        style={{ minHeight: "350px", padding: "2em", textAlign: "center" }}>
        <Modal.Content>
          <Header size="large" dividing={false}>
            CREATE AN ACCOUNT
          </Header>
          {/* <Icon size='big' color='blue' name='facebook'
            className='socialIcon' onClick={() => this.registerPassport('facebook')}/>
          <Icon size='big' color='red' name='google plus square'
            className='socialIcon' onClick={() => this.registerPassport('google')}/>
          <Icon size='big' style={{color: '#1da1f2'}} name='twitter square'
            className='socialIcon' onClick={() => this.registerPassport('twitter')}/>
          <Divider horizontal>OR</Divider> */}
          {/* Display message when form submission has failed */}
          {this.state.failRegister && (
            <span style={{ color: "red" }}>Unable to create account</span>
          )}
          <Form onSubmit={this.handleSubmit} style={{ paddingBottom: "1em" }}>
            <Form.Group widths="equal">
              <Form.Field>
                <label style={{ textAlign: "left" }}>First Name</label>
                <input
                  onChange={this.handleInput}
                  placeholder="Jane"
                  name="firstName"
                  value={this.state.firstName}
                />
              </Form.Field>
              <Form.Field>
                <label style={{ textAlign: "left" }}>Last Name</label>
                <input
                  onChange={this.handleInput}
                  placeholder="Doe"
                  name="lastName"
                  value={this.state.lastName}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field required>
                <label style={{ textAlign: "left" }}>Username</label>
                <input
                  onChange={this.handleInput}
                  placeholder="jane123"
                  name="username"
                  value={this.state.username}
                />
              </Form.Field>
              <Form.Field required>
                <label style={{ textAlign: "left" }}>Email</label>
                <input
                  onChange={this.handleInput}
                  placeholder="jane@email.com"
                  type="email"
                  name="email"
                  value={this.state.email}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field required>
                {/* Display message when passwords do not match */}
                {this.state.failPassword && (
                  <span style={{ color: "red" }}>Passwords do not match</span>
                )}
                <label style={{ textAlign: "left" }}>Password</label>
                <input
                  onChange={this.handleInput}
                  type="password"
                  name="password"
                  value={this.state.password}
                />
              </Form.Field>
              <Form.Field required>
                <label style={{ textAlign: "left" }}>Verify Password</label>
                <input
                  onChange={this.handleInput}
                  type="password"
                  name="verifyPassword"
                  value={this.state.verifyPassword}
                />
              </Form.Field>
            </Form.Group>
            <Button
              type="submit"
              primary
              style={{ backgroundColor: "#37bc9b" }}>
              SIGN UP
            </Button>
          </Form>
          <span>Already have an account? </span>
          <span
            onClick={() => this.props.toggleModal("signIn")}
            className="login-register-button"
            style={{ color: "#37bc9b" }}>
            Sign in
          </span>
        </Modal.Content>
      </Modal>
    );
  }
}

export default Register;
