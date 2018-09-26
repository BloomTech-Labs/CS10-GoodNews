import React from 'react';
import { Dropdown, Icon, Button, Popup } from 'semantic-ui-react';

const ArticleOptions = (props) => {
  return (
    // <Dropdown icon='ellipsis horizontal' pointing='top right'>
    //   <Dropdown.Menu>
    //     <Dropdown.Item 
    //       text="Save for later" onClick={props.save}/>
    //     <Dropdown.Item 
    //       text="Report as clickbait" 
    //       onClick={()=>console.log("reporting clickbait")}/>
    //   </Dropdown.Menu>
    // </Dropdown>
    <React.Fragment>
      <Popup 
        trigger={<Button icon='bookmark outline' className='articleOptionsButton'/>}
        content='Add to reading list' />
      {/* <Icon name='bookmark outline' color='grey' onClick={props.save}/> */}
    </React.Fragment>
  );
}
 
export default ArticleOptions;