import React from 'react';

import Panel from './Panel.jsx';


export default class ImagePanel extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { 
  }

  render() {
    return (
      <Panel className="imagePanel">
        Select an Image
      </Panel>
    );
  }
};
