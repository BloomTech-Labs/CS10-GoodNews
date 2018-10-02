import React from 'react';
import { Button, Popup, Icon, Modal, Header, Form } from 'semantic-ui-react';

const ArticleOptions = (props) => {
  return (
    <React.Fragment>
      {props.articleOptions === 'all' &&(
        <div style={{ display: 'flex' }}>
          <Popup 
            trigger={<Button icon='bookmark outline' className='articleOptionsButton' onClick={props.save}/>}
            content='Add to reading list'/>
          <Popup 
            trigger={
              <Button icon='ban' 
                className='articleOptionsButton'
                onClick={() => props.report(true)}/>
            }
            content='Report as clickbait'/>
        </div>
      )}
      {props.articleOptions === 'saved' &&(
        <div>
          <Popup 
            trigger={<Icon name='close' color='grey' onClick={props.remove}/>}
            content='Remove from reading list'/>
        </div>
      )}
      {props.articleOptions === 'clickbait' &&(
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Button.Group>
            <Modal closeIcon 
              trigger={
                <Button primary style={{ backgroundColor: '#37bc9b', width: '150px' }}>Clickbait</Button>}
              style={{ padding: '2em' }}>
              <Modal.Content
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                <Header size="large" textAlign="center">Is This Clickbait?</Header>
                <Form>
                  <Form.Checkbox label="I have read/scanned this article"/>
                  <Form.Checkbox label="The headline withholds information required to understand what the content of the article is"/>
                  <Form.Checkbox label="The headline exaggerates the article to create misleading expectations for the reader"/>
                </Form>
                <Button primary 
                  style={{ backgroundColor: '#37bc9b', marginTop: '30px' }}
                  onClick={() => props.report(true)}>
                  This is clickbait
                </Button>
              </Modal.Content>
            </Modal>
            <Button.Or />
            <Modal closeIcon trigger={<Button style={{ width: '150px' }}>Not Clickbait</Button>}
              style={{ padding: '2em' }}>
              <Modal.Content
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                <Header size="large" textAlign="center">Is This Legitimate News?</Header>
                <Form>
                  <Form.Checkbox label="I have read/scanned this article"/>
                  <Form.Checkbox label="The headline includes information required for the reader to understand what the article is about"/>
                  <Form.Checkbox label="The headline creates accurate expectations for the reader and does not exaggerate"/>
                </Form>
                <Button primary type='submit' 
                  style={{ backgroundColor: '#37bc9b', marginTop: '30px' }}
                  onClick={() => props.report(false)}>
                  This is not clickbait
                </Button>
              </Modal.Content>
            </Modal>
          </Button.Group>
        </div>
      )}
    </React.Fragment>
  )
}
 
export default ArticleOptions;