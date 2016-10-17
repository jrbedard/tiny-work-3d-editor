import React from 'react';

import Editor from './Editor.jsx';


export default class GenericEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Editor className="GenericEditor">
        Generic Editor
        
      </Editor>
    );
  }
};
