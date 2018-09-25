import React, { Component } from 'react';
import { Modal, Icon, Header, Grid } from 'semantic-ui-react';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      changeName: false,
      changeUsername: false,
      changeEmail: false,
      changePassword: false
    }
  }

  render() { 
    return (
      <Modal open={true}
        onClose={() => this.props.toggleModal('')}
        style={{ minHeight: '350px', padding: '2em' }}>
        <Icon name="close" onClick={() => this.props.toggleModal('')}/>
        <Header size="large">SETTINGS</Header>
        <Modal.Content>
          <Grid columns={2}>
            <Grid.Column width={3} style={{ backgroundColor: 'yellow' }}>
              <Grid.Row>Name</Grid.Row>
              <Grid.Row>Userame</Grid.Row>
              <Grid.Row>Email</Grid.Row>
              <Grid.Row>Password</Grid.Row>
            </Grid.Column>
            <Grid.Column width={13} style={{ backgroundColor: 'red' }}>
              <Grid.Row>Name</Grid.Row>
              <Grid.Row>Userame</Grid.Row>
              <Grid.Row>Email</Grid.Row>
              <Grid.Row>Password</Grid.Row>
            </Grid.Column>
          </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}
 
export default Settings;