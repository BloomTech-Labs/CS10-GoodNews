import React from 'react';
import { Grid, Button, Input } from 'semantic-ui-react';

const ChangeSettings = (props) => {
  return (
  <Grid.Row>
    <Grid.Column width={3}>
      {props.userInfoTitle}
    </Grid.Column>
    <Grid.Column width={12}>
      {props.editing ? (
        <Grid.Row>
          <Input
            fluid
            name={props.name}
            value={props.value} 
            onChange={props.handleChange}
            type={props.type ? props.type : 'text'}/>
          {props.name2 &&
          <Input
            fluid
            style={{ marginTop: '10px' }}
            name={props.name2}
            value={props.value2} 
            onChange={props.handleChange}
            type={props.type ? props.type : 'text'}/>}
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <Button 
              primary style={{ backgroundColor: '#37bc9b', margin: '10px' }}
              onClick={(e)=>{
                if (props.name2) {
                  props.handleSubmit(e, props.name, props.name2)
                } else {
                  props.handleSubmit(e, props.name)
                }
                props.toggleEdit()
                }}>
              Save Changes
            </Button>
            <Button onClick={props.toggleEdit} style={{ margin: '10px' }}>
              Cancel
            </Button>
          </div>
        </Grid.Row>
      ) : (
        <Grid.Row>
          {props.userInfo}
        </Grid.Row>)}
    </Grid.Column>
    <Grid.Column width={1}>
      <Grid.Row>
        {props.editing ? (
          null
        ) : (
          <span onClick={props.toggleEdit} className='editUserInfo'>
            Edit
          </span>
        )}
      </Grid.Row>
    </Grid.Column>
  </Grid.Row>);
}
 
export default ChangeSettings;
