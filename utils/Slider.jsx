import React from 'react';

// Slider : wrap of https://github.com/seiyria/bootstrap-slider
export default class Slider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: props.value || 0, disabled: props.disabled || false};
  }

  componentDidMount() {
    var self = this;
    var slider = $(this.refs.slider);

    this.slider = $(slider).slider({
      min: this.props.min || 0,
      max: this.props.max || 10,
      step: this.props.step || 1,
      value: this.state.value || 0,
      precision: this.props.precision || 2,
      tooltip: this.props.tooltip || 'never',
      tooltip_position: this.props.tooltip_position || "top",
      orientation: this.props.orientation || 'horizontal',
      reversed: this.props.reversed || false,

      ticks: this.props.ticks,
      ticks_labels: this.props.ticksLabels,
      ticks_snap_bounds: this.props.ticksSnapBounds,
    });


    this.slider.on("slide", function(e) {
      if(self.props.onSlide) {
        self.props.onSlide(e);
      }
    });

    this.updateDisabled();
  }


  updateDisabled() {
    if(!this.slider) { return; }

    if(this.state.disabled) {
      this.slider.slider("disable");
    } else {
      this.slider.slider("enable");
    }
  }



  render() {
    // data-slider-handle={(this.props.handle?"custom":"")}

    return (
      <div style={{marginBottom:20}}>
        <span>
          <i className={`fa fa-fw fa-2x fa-${this.props.icon}`} title={this.props.title}></i>
          <span style={{marginRight:15}}>{this.props.title}</span>
        </span>

        <input ref="slider" data-slider-id='sliderSlider' type="text" />
      </div>
    );
  }
}

