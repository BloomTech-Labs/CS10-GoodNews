import React from "react";
import { Component } from "react";
import axios from "axios";
import {
  Modal,
  Grid,
  Header,
  Form,
  Button,
  Divider,
  List,
  Input,
} from "semantic-ui-react";

// Production Server URL or localhost for local testing
const url =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_SERVER
    : "http://localhost:5000";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      failLogin: false,
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
      failLogin: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ failPassword: false });
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    this.loginUser(user);
  };

  loginUser = user => {
    axios
      .post(`${url}/api/user/login`, user)
      .then(user => {
        localStorage.setItem("auth-token", user.data.token);
        localStorage.setItem("userid", user.data.user._id);
        this.props.login();
        this.props.toggleModal("");
      })
      .catch(() => {
        this.setState({ failLogin: true });
      });
  };

  loginPassport = socialMedia => {
    console.log("logging in with google");
    axios
      .get(`${url}/auth/${socialMedia}`, {
        withCredentials: true,
        crossDomain: true,
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Modal
        closeIcon
        open
        onClose={() => this.props.toggleModal("")}
        style={{ minHeight: "350px", padding: "2em" }}>
        <Modal.Content>
          <Grid columns={3} stackable>
            {/* Only display this section on desktop or tablet screens */}
            <Grid.Column
              only="tablet computer"
              width={7}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Header size="large" textAlign="center">
                CREATE AN ACCOUNT
              </Header>
              <List bulleted>
                <List.Item>Save articles for later</List.Item>
                <List.Item>Help us improve by reporting clickbait</List.Item>
                <List.Item>Comment on articles</List.Item>
              </List>
              <Divider />
              <Button
                primary
                style={{ backgroundColor: "#37bc9b" }}
                onClick={() => this.props.toggleModal("register")}>
                SIGN UP
              </Button>
            </Grid.Column>
            <Grid.Column width={2} only="tablet computer">
              <Divider vertical>OR</Divider>
            </Grid.Column>
            <Grid.Column
              width={7}
              textAlign="center"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Header size="large">SIGN IN</Header>
              {/* <Grid.Row>
                <Icon size='big' color='blue' name='facebook'
                  className='socialIcon' onClick={() => this.loginPassport('facebook')}/>
                <Icon size='big' color='red' name='google plus square'
                  className='socialIcon' onClick={() => this.loginPassport('google')}/>
                <Icon size='big' style={{color: '#1da1f2'}} name='twitter square'
                  className='socialIcon' onClick={() => this.loginPassport('twitter')}/>
              </Grid.Row>
              <Grid.Row>
                <Divider horizontal>OR</Divider>
              </Grid.Row> */}
              {/* Display message when form submission has failed */}
              {this.state.failLogin && (
                <span style={{ color: "red" }}>
                  Username or Password is incorrect
                </span>
              )}
              <Form
                onSubmit={this.handleSubmit}
                style={{ width: "100%", maxWidth: "300px" }}>
                <Form.Field>
                  <label style={{ textAlign: "left" }}>Username</label>
                  <Input
                    fluid
                    onChange={this.handleInput}
                    name="username"
                    value={this.state.username}
                  />
                </Form.Field>
                <Form.Field>
                  <label style={{ textAlign: "left" }}>Password</label>
                  <Input
                    fluid
                    onChange={this.handleInput}
                    type="password"
                    name="password"
                    value={this.state.password}
                  />
                </Form.Field>
                <Divider />
                <Button type="submit">SIGN IN</Button>
              </Form>
            </Grid.Column>
            {/* Display this only on mobile screens */}
            <Grid.Row
              only="mobile"
              centered
              onClick={() => this.props.toggleModal("register")}>
              <span>{"Don't have an account?"}</span>
              <span style={{ color: "#37bc9b", paddingLeft: "0.5em" }}>
                Sign up
              </span>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}

export default SignIn;
