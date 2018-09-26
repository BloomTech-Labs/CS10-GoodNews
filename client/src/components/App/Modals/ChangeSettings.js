import React, { Component } from 'react';
import { Grid, Button, Input } from 'semantic-ui-react';

class ChangeSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserInfo: props.userInfo[1],
      inputValue: props.userInfo[1].split(' ')[0],
      inputValue2: props.extraInfo ? props.extraInfo : null
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let value = this.state.inputValue;
    if (this.state.inputValue2) {
      value = value.concat(' ', this.state.inputValue2);
    }
    const newUser = {
      [this.props.userInfo[2]]: value
    }
    this.props.saveUser(newUser);
  }

  render() { 
    return (
      <Grid.Row>
        <Grid.Column width={3}>
          {this.props.userInfo[0]}
        </Grid.Column>
        <Grid.Column width={12}>
          {this.props.editing ? (
            <Grid.Row>
              <Input
                fluid
                id={this.props.userInfo[2]}
                name='inputValue'
                value={this.state.inputValue} 
                onChange={this.handleChange}
                type={this.props.type ? this.props.type : 'text'}/>
              {this.props.extraInfo &&
              <Input
                fluid
                name='inputValue2' 
                value={this.state.inputValue2} 
                onChange={this.handleChange}
                type={this.props.type ? this.props.type : 'text'}/>}
              <div>
                <Button 
                  primary style={{ backgroundColor: '#37bc9b' }}
                  onClick={(e)=>{
                    this.handleSubmit(e)
                    this.props.toggleEdit()
                    }}>
                  Save Changes
                </Button>
                <Button onClick={this.props.toggleEdit}>
                  Cancel
                </Button>
              </div>
            </Grid.Row>
          ) : (
            <Grid.Row>
              {this.props.userInfo[1]}
            </Grid.Row>)}
        </Grid.Column>
        <Grid.Column width={1}>
          <Grid.Row>
            {this.props.editing ? (
              null
            ) : (
              <span onClick={this.props.toggleEdit} className='editUserInfo'>
                Edit
              </span>
            )}
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    );
  }
}
 
export default ChangeSettings;