import React from 'react';

import Panel from './Panel.jsx';
import TransPanel from './TransPanel.jsx';

var MediaPanelActions = require('../actions/MediaPanelActions');
//var TextPanelStore = require('../stores/TextPanelStore');


export default class IconPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { 
  }

  render() {
    return (
      <Panel className="iconPanel">
        Select an Icon

        <hr/>

        

      </Panel>
    );
  }
};
