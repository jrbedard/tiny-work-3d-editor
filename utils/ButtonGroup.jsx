import React from 'react';


// Button Group
export default class ButtonGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = props; // props options become state
  }

  componentDidMount() {
  }

  // Clicked an option
  onClick(e) {
    e.preventDefault();
    var changed = {};

    for(var i in this.state.options) {
      var obj = this.state.options[i];

      if(this.props.type=='one' || this.props.type=='tabs') { // mutually exclusives
        if(obj.id == e.currentTarget.id) {
          obj.active = true;
          changed = {id:obj.id, active:true};
        }
        else { obj.active = false; }

      } else { // toolbar, many can be selected
        if(obj.id == e.currentTarget.id) { 
          obj.active = !obj.active;
          changed = {id:obj.id, active:obj.active};
        }
      }
    }
    this.setState(this.state.options); // active changed

    if(this.props.onChange) {
      this.props.onChange(changed);
    }
  }


  // todo: change icons dynamically?


  render() {
    var btns=[];
    for(var i in this.state.options) {
      var obj = this.state.options[i];
      if(obj.hidden) { continue; }

      var btnClass = "btn " + (this.props.btnClass || "btn-default");
      btnClass += (obj.active ? " active" : ""); // from state

      var href = (this.props.href ? {href:this.props.href} : "");

      btns.push(<button key={obj.id} id={obj.id} type="button" className={btnClass}
        title={obj.title} disabled={obj.disabled} style={{}}

        onClick={this.onClick.bind(this)}>
          <i className={`fa fa-${obj.icon} fa-fw`}></i>
          <span>{obj.text}</span>
        </button>);
    };

    var btnGroupClass = "btn-group";
    if(this.props.type=='tabs') {
      btnGroupClass += " nav nav-tabs"; // act as tabs?
    }

    return (
      <div id={this.props.id} ref={this.props.id} className={btnGroupClass} style={this.props.style}
        role="group" data-toggle="btn">
        {btns}
      </div>
    );
  }
}
