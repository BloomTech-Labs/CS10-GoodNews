import React from 'react'
import { Grid, Button, Input } from 'semantic-ui-react'

const ChangeSettings = (props) => {
  return (
    <Grid.Row>
      <Grid.Column width={3}>
        {props.userInfoTitle}
      </Grid.Column>
      <Grid.Column width={12}>
        {props.editing ? (
          <Grid.Row>
            {props.failPassword && <div style={{ color: 'red' }}>Passwords do not match</div>}
            {props.failSave && <div style={{ color: 'red' }}>Unable to save changes</div>}
            {props.name3 &&
            <React.Fragment>
              <label>{props.label3}</label>
              <Input
                fluid
                name={props.name3}
                value={props.value3}
                onChange={props.handleChange}
                type={props.type ? props.type : 'text'}
                style={{ marginBottom: '10px' }} />
            </React.Fragment>}
            <label>{props.label ? props.label : props.userInfoTitle}</label>
            <Input
              fluid
              name={props.name}
              value={props.value}
              onChange={props.handleChange}
              type={props.type ? props.type : 'text'}
              style={{ marginBottom: '10px' }} />
            {props.name2 &&
            <React.Fragment>
              <label>{props.label2}</label>
              <Input
                fluid
                name={props.name2}
                value={props.value2}
                onChange={props.handleChange}
                type={props.type ? props.type : 'text'} />
            </React.Fragment>}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                primary style={{ backgroundColor: '#37bc9b', margin: '10px' }}
                onClick={(e) => {
                  if (props.name3) {
                    props.handleSubmit(e, props.name, props.toggleEdit, props.name2, props.name3)
                  } else if (props.name2) {
                    props.handleSubmit(e, props.name, props.toggleEdit, props.name2)
                  } else {
                    props.handleSubmit(e, props.name, props.toggleEdit)
                  }
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
    </Grid.Row>)
}

export default ChangeSettings
