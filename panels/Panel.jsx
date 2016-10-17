import React from 'react';


export default class Panel extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className={this.props.className+" tinyPanel"}>
        {this.props.children}
      </div>
    );
  }
};
