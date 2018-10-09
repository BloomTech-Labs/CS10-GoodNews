import React from 'react';
import { Card, Header } from 'semantic-ui-react';

const EvaluateDescription = () => {
  return (
    <Card fluid
    style={{ 
      padding: '1em',
      marginBottom: '1em',
      display: 'flex',
      alignItems: 'flex-start',
      maxWidth: '700px'}}>
      <Card.Content className='evaluate-card'>
        <Header style={{ textAlign: 'center', paddingBottom: '15px' }}>
          Help us out!
        </Header>
        You can help us improve our model by reviewing articles in this section. 
        All articles in the this section have been labeled as clickbait by our machine learning classifier. 
        If you come across an article that has been wrongly labeled, you can send a report. 
        We will use this data to better classify clickbait.
      </Card.Content>
    </Card>
  );
}
 
export default EvaluateDescription;