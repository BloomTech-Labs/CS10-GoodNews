import React from 'react';
import { Modal, Icon } from 'semantic-ui-react';

const Settings = (props) => {
  const close = () => props.toggleModal('');

  return (
    <Modal open={true}
      onClose={close}
      style={{minHeight: '350px', padding: '2em'}}>
      <Icon name="close" onClick={close}/>
      <Modal.Content>Settings</Modal.Content>
    </Modal>
  );
}
 
export default Settings;