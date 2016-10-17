import React from 'react';

import Panel from './Panel.jsx';
import MediaPanel from '../panels/MediaPanel.jsx';


// Add a socle
export default class BasePanel extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Panel>
        Base Editor

        Shape:

        Size:
        
        Text:

      </Panel>
    );
  }
};
