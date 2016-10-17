import React from 'react';

import Slider from './Slider.jsx';


export default class Input3D extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.clear = this.clear.bind(this);
    this.focus = this.focus.bind(this);
    
    this.state = {};
  }
  
  //types = ['numerical','slider','drag'];
 
  focus() {
    const input = this.refs.input;
    input.getDOMNode().focus();
  }
  clear() {
    const input = this.refs.input;
    input.getDOMNode().value = '';
  }
  
  
  onChange(e) {
    
  }
  
  numerical(op) {
    return this.state[op].x + "," + this.state[op].y + "," + this.state[op].z;
  }
  
  
  render() {
    var input = [];
    if(this.props.position && this.props.position.type) {
      if(this.props.position.type=='numerical') {
        input.push(<span key='translationNum'><span>Pos</span><input onChange={this.onChange.bind(this)} value={this.numerical('position')} /></span>);
      }
    }
    if(this.props.rotation && this.props.rotation.type) {
      if(this.props.rotation.type=='numerical') {
        input.push(<input key='rotationNum' onChange={this.onChange.bind(this)} value={this.numerical('rotation')} />);
      }
    }
    if(this.props.scale) {
      input.push(<input key='scaleNum' onChange={this.onChange.bind(this)} value={this.numerical('scale')} />);
    }
    
    return (
      <div>
        {input}
      </div>
    );
  }
};


// props
Input3D.propTypes = {
  type: React.PropTypes.string,
  label: React.PropTypes.string,
  tooltip: React.PropTypes.string,

  value: React.PropTypes.number,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  step: React.PropTypes.number,

  x: React.PropTypes.number,
  y: React.PropTypes.number,
  z: React.PropTypes.number,
};

Input3D.defaultProps = {
  type: "numerical",
  label: "Size:",
  tooltip: "Set Size",
};



