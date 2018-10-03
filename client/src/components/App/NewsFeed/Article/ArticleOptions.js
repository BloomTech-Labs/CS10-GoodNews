import React from 'react';
import { Button, Popup, Icon } from 'semantic-ui-react';
import ReportClickbait from '../../Modals/ReportClickbait';

const ArticleOptions = (props) => {
  return (
    <React.Fragment>
      <ReportClickbait 
        open={props.clickbaitModal}
        closeModal={props.closeModal}
        clickbait={true}
        report={() => props.report(true)}/>
      <ReportClickbait 
        open={props.nonClickbaitModal}
        closeModal={props.closeModal} 
        notClickbait={true} 
        report={() => props.report(false)}/>
      {props.articleOptions === 'all' &&(
        <div style={{ display: 'flex' }}>
          <Popup 
            trigger={props.saved ? (
              <Button icon='bookmark' className='articleOptionsButton'/>
            ) : (
              <Button icon='bookmark outline' 
              className='articleOptionsButton' onClick={props.save}/>)}
            content='Add to reading list'/>
          <Popup 
            trigger={props.reported ? (
              <Button icon='check' className='articleOptionsButton'/>
            ) : (
              <Button icon='ban' 
                className='articleOptionsButton'
                onClick={()=>props.openModal('clickbaitModal')}/>)}
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
      {props.articleOptions === 'clickbait' && (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Button.Group>
            <Button 
              primary 
              style={{ backgroundColor: '#37bc9b', width: '150px' }}
              onClick={()=>props.openModal('clickbaitModal')}>
              Clickbait
            </Button>
            <Button.Or />
            <Button onClick={()=>props.openModal('nonClickbaitModal')}>
              Not Clickbait
            </Button>
          </Button.Group>
        </div>
      )}
    </React.Fragment>
  )
}
 
export default ArticleOptions;