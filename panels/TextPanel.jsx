import React from 'react';

import Panel from './Panel.jsx';
import FontSelect from '../utils/FontSelect.jsx';
import ButtonGroup from '../utils/ButtonGroup.jsx';
import TransPanel from './TransPanel.jsx';


var MediaPanelActions = require('../actions/MediaPanelActions');
var TabStore = require('../stores/TabStore');
var ViewerStore = require('../stores/ViewerStore');

const FONTS = require('../constants/fonts').FONTS;


// Input text to turn 3D
export default class TextPanel extends React.Component {
  constructor(props) {
    super(props);

    var tab = TabStore.get(props.tab);
    var text = ViewerStore.get3DText(props.tab).text || "";
    var slidersDisabled = !(text && text != "");

    var style = {fontFamily:"helvetiker", fontWeight:"normal", fontStyle:"normal", textAlign:"center", 
    size:20, height:4}; // immutable

    this.state = {
      tab: tab,
      text: text,
      //style: style,
      slidersDisabled: slidersDisabled,
    };
  }
  

  componentDidMount() {
    
  }


  onChangeText(e) {
    var text = e.target.value;
    MediaPanelActions.updateText(this.props.tab, text);
    this.setState({text:text});
  }


  onChangeFont(font) {
    var style = {};
    style.fontFamily = font.name;
    style.fontWeight = (font.bold?"bold":"normal");
    style.fontStyle = (font.italic?"italic":"normal");
    style.textAlign = font.textAlign; // todo

    MediaPanelActions.updateStyle(this.props.tab, style);
    //this.setState({style:style});
  }


  onRotate(e) {
    MediaPanelActions.rotate(this.props.tab, e.target.value);
  }
  onScale(e) {
    MediaPanelActions.scale(this.props.tab, e.target.value);
  }
  onTranslate(e) {
    MediaPanelActions.translate(this.props.tab, e.target.value);
  }
  onExtrude(e) {
    MediaPanelActions.extrude(this.props.tab, e.target.value);
  }


  render() {
    return (
      <Panel className='textPanel'>
        <h5>{this.props.title}</h5>
        <p>{this.props.description}</p>

        <textarea autoFocus ref="textInput" style={{height:60, paddingTop:10, fontSize:21, textAlign:"center"}}
          placeholder={this.state.tab.desc+" text..." || "Enter text..."}
          value={this.state.text}
          onChange={this.onChangeText.bind(this)} />
        
        <FontSelect label="Select Font"
          fonts={FONTS} searchable={true} sizes={false}
          onChange={this.onChangeFont.bind(this)} />

        <hr/>

        <TransPanel trans={[
            {type: 'scaling', value:20, min:1, max:100, step:1},
            {type: 'rotation', value:0, min:0, max:360, step:1},
            {type: 'extrude', value:4, min:1, max:100, step:1}
          ]}
          tab={this.props.tab}
          disabled={this.state.slidersDisabled}
          onRotate={this.onRotate.bind(this)}
          onScale={this.onScale.bind(this)}
          onTranslate={this.onTranslate.bind(this)}
          onExtrude={this.onExtrude.bind(this)}
        />

      </Panel>
    );
  }
};

