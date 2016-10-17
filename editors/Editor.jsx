import React from 'react';


export default class Editor extends React.Component {
  constructor(props) {
    super(props);

    // state : tab opened?
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
};
