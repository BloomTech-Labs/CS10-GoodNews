import React from 'react';
import { Modal, Button, Header, Form } from 'semantic-ui-react';

const ReportClickbait = (props) => {
  const modal = props.clickbait ? 'clickbaitModal' : 'nonClickbaitModal';
  return (
    <Modal closeIcon
      onClose={()=>props.closeModal(modal)}
      open={props.open}
      style={{ padding: '2em' }}>
      <Modal.Content
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        {props.clickbait && 
        (<React.Fragment>
          <Header size="large" textAlign="center">IS THIS CLICKBAIT?</Header>
          <Form>
            <Form.Checkbox label="I have read/scanned this article"/>
            <Form.Checkbox label="The headline withholds information required to understand what the content of the article is"/>
            <Form.Checkbox label="The headline exaggerates the article to create misleading expectations for the reader"/>
          </Form>
        </React.Fragment>)}
        {props.notClickbait &&
        (<React.Fragment>
          <Header size="large" textAlign="center">IS THIS LEGITIMATE NEWS?</Header>
          <Form>
            <Form.Checkbox label="I have read/scanned this article"/>
            <Form.Checkbox label="The headline includes information required for the reader to understand what the article is about"/>
            <Form.Checkbox label="The headline creates accurate expectations for the reader and does not exaggerate"/>
          </Form>
        </React.Fragment>)}
        <Button primary 
          style={{ backgroundColor: '#37bc9b', marginTop: '30px' }}
          onClick={props.report}>
          SEND REPORT
        </Button>
        <Button onClick={()=>props.closeModal(modal)}>
          CANCEL
        </Button>
      </Modal.Content>
    </Modal>
  );
}
 
export default ReportClickbait;