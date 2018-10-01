import React from 'react';
import { Button, Popup, Icon } from 'semantic-ui-react';

const ArticleOptions = (props) => {
  return (
    <React.Fragment>
      {props.articleOptions === 'all' &&(
        <div style={{ display: 'flex' }}>
          <Popup 
            trigger={<Button icon='bookmark outline' className='articleOptionsButton' onClick={props.save}/>}
            content='Add to reading list'/>
          <Popup 
            trigger={<Button icon='ban' className='articleOptionsButton'/>}
            content='Report as clickbait' />
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
        <div>Is this clickbait?</div>
      )}
    </React.Fragment>
  )
  // return (
    // <Dropdown icon='ellipsis horizontal' pointing='top right'>
    //   <Dropdown.Menu>
    //     <Dropdown.Item 
    //       text="Save for later" onClick={props.save}/>
    //     <Dropdown.Item 
    //       text="Report as clickbait" 
    //       onClick={()=>console.log("reporting clickbait")}/>
    //   </Dropdown.Menu>
    // </Dropdown>

    
  // );
}
 
export default ArticleOptions;