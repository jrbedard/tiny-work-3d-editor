import React from 'react';
import Select from 'react-select';

import ButtonGroup from './ButtonGroup.jsx';



export default class FontSelect extends React.Component {

  constructor(props) {
    super(props);
    
    var font = props.fonts[0]; // first font, todo: from TW

    this.state = {
      font:font.value, bold:false, italic:false, textAlign:"center",
      selectDisabled:false,
      boldDisabled:!font.bold, italicDisabled:!font.italic,
    };
    this.fontChanged();
  }


  onChangeFont(fontName) {
    var font = null;
    for(var i=0; i < this.props.fonts.length; i++) {
      if(fontName == this.props.fonts[i].value) {
        font = this.props.fonts[i]; break;
      }
    }
    if(!font) { return; }

    this.setState({
      font:font.value, bold:false, italic:false,
      boldDisabled:!font.bold, italicDisabled:!font.italic,
    }, this.fontChanged);
  }


  onChangeBoldItalic(obj) {
    var newState = {};
    newState[obj.id] = obj.active;
    this.setState(newState, this.fontChanged);
  }

  onChangeAlign(obj) {
    this.setState({textAlign:obj.id}, this.fontChanged);
  }


  // to parent
  fontChanged() {
    var font={name:this.state.font, bold:this.state.bold, italic:this.state.italic, textAlign:this.state.textAlign};
    
    var fontFile = gSitePath+"font/"+font.name+"_"+(font.bold?"bold":"regular")+".typeface.js";
    var self = this;

    $.getScript(fontFile, function(data, textStatus, jqxhr) {
      // todo: progress
      console.log("font loaded");
      self.props.onChange(font);
    });
  }

 

  render() {
    return (
      <div className="fontSelect">
        <span>{this.props.label}</span>

        <Select ref="fontSelect" name="fontSelect"
          searchable={this.props.searchable} disabled={this.state.selectDisabled}
          options={this.props.fonts}
          value={this.state.font}
          onChange={this.onChangeFont.bind(this)} />


        <div style={{marginTop:10}}>

          <ButtonGroup id="boldItalicOptions" btnClass="btn-default" type="many"
            options={[
              {id:"bold", icon:"bold", title:"Bold", disabled:this.state.boldDisabled, active:this.state.bold},
              {id:"italic", icon:"italic", title:"Italic", disabled:this.state.italicDisabled, active:this.state.italic},
            ]} 
            onChange={this.onChangeBoldItalic.bind(this)} />


          <ButtonGroup id="textAlignOptions" btnClass="btn-default" style={{paddingLeft:20}} type="one"
            options={[
              {id:"left", icon:"align-left", title:"Align text left"},
              {id:"center", icon:"align-center", title:"Align text center", active:true},
              {id:"right", icon:"align-right", title:"Align text right"}
            ]} 
            onChange={this.onChangeAlign.bind(this)} />

        </div>

      </div>
    );
  }
}

// props
FontSelect.propTypes = {
  label: React.PropTypes.string,
  fonts: React.PropTypes.array.isRequired,
  textInput: React.PropTypes.element,
  searchable: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};

FontSelect.defaultProps = {
  label: 'Select Font',
  fonts: [],
  textInput: null,
  searchable: true,
  onChange: null,
};


