import React from 'react';

var ViewerStore = require('../stores/ViewerStore');


// Dummy viewer
export default class Viewer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    ViewerStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    ViewerStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    // noop
  }

  render() {
    return (
      <div className="dummyViewer"></div>
    );
  }
};
