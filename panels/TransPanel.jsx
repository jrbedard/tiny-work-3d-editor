import React from 'react';

import Panel from './Panel.jsx';
import Slider from '../utils/Slider.jsx';

var TabStore = require('../stores/TabStore');
var EditorActions = require('../actions/EditorActions');



// Transformation panel
export default class TransPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {disabled:props.disabled || false};
  }

  componentDidMount() {
    TabStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    TabStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    var tab = TabStore.get(this.props.tab);
    var disabled = !tab.edited; // tab Text or Icon was edited

    this.setState({disabled:disabled});

    if(this.refs.rotationSlider && this.refs.rotationSlider.state.disabled != disabled) {
      this.refs.rotationSlider.setState({disabled:disabled}, this.refs.rotationSlider.updateDisabled);
    }
    if(this.refs.transformationSlider && this.refs.transformationSlider.state.disabled != disabled) {
      this.refs.rotationSlider.setState({disabled:disabled}, this.refs.rotationSlider.updateDisabled);
    }
    if(this.refs.scalingSlider && this.refs.scalingSlider.state.disabled != disabled) {
      this.refs.scalingSlider.setState({disabled:disabled}, this.refs.scalingSlider.updateDisabled);
    }
    if(this.refs.depthSlider.state.disabled != disabled) {
      this.refs.depthSlider.setState({disabled:disabled}, this.refs.depthSlider.updateDisabled);
    }
  }



  render() {
    var transformations = [];

    // TODO: add flips (mirrors)

    for(var i in this.props.trans) {
      var trans = this.props.trans[i];
      
      if(trans.type == 'rotation') {
        transformations.push(<div key='rotation'>
          <Slider ref="rotationSlider" title="Rotate" icon="rotate-right"
            unit="Degrees" 
            min={trans.min || 0} max={trans.max || 360} step={trans.step || 1} value={trans.value || 0}
            ticks={[0,90,180,270,360]}
            ticksSnapBounds={8}
            disabled={this.state.disabled}
            onSlide={this.props.onRotate.bind(this)} />
        </div>);

      }
      else if(trans.type == 'scaling') {
        transformations.push(<div key='scale'>
          <Slider ref="scalingSlider" title="Size" icon="arrows-alt"
            min={trans.min || 0.1} max={trans.max || 5.0} step={trans.step || 0.1} 
            precision={trans.precision || 1} value={trans.value || 1.0}
            disabled={this.state.disabled}
            onSlide={this.props.onScale.bind(this)} />
        </div>);

      }
      else if(trans.type == 'extrude') {
        transformations.push(<div key='extrude'>
          <Slider ref="depthSlider" title="Depth" icon="cube"
            unit='mm'
            min={trans.min || 10} max={trans.max || 100} value={trans.value || 10} step={trans.step || 1}
            disabled={this.state.disabled}
            onSlide={this.props.onExtrude.bind(this)} />
        </div>);

      }
    }

    return (
      <Panel className="transPanel">
        {transformations}
      </Panel>
    );
  }
};

