import React from 'react';
import Select from 'react-select';

import ButtonGroup from '../utils/ButtonGroup.jsx';
import Panel from './Panel.jsx';
import TextPanel from './TextPanel.jsx';
import IconPanel from './IconPanel.jsx';
import ImagePanel from './ImagePanel.jsx';


// Media (Text, Icon, Image)
export default class MediaPanel extends React.Component {
  constructor(props) {
    super(props);

    // todo: this.props.type = ButtonGroup or Dropdown

    this.state = {selected:"text"};
  }

  componentDidMount() { 
  }

  onChangeMedia(obj) {
    $('#icon').tab('show');
  }


  render() {
    // Text, Icon, Image (Tabs)
    var options = [];
    for(var i in this.props.options) {
      var option = this.props.options[i];

      if(option=='text') {
        options.push({id:"text", icon:"align-left", text:"Text", active:true});
      }
      if(option=='icon') {
        options.push({id:"icon", icon:"star", text:"Icon", disabled:true});
      }
      if(option=='image') {
        options.push({id:"image", icon:"image", text:"Image"});
      }
    }


    // Text, Icon, Image (Tab Content)
    var medias = [];
    for(var i in this.props.options) {
      var option = this.props.options[i];

      if(option=='text') {
        medias.push(<div key="textTab" id="text" role="tabpanel" className="tab-pane active">
          <TextPanel tab={this.props.tab} /></div>);
      }
      if(option=='icon') {
        medias.push(<div key="iconTab" id="icon" role="tabpanel" className="tab-pane" >
          <IconPanel tab={this.props.tab} /></div>);
      }
      if(option=='image') {
        medias.push(<div key="imageTab" id="image" role="tabpanel" className="tab-pane" >
          <ImagePanel tab={this.props.tab} /></div>);
      }
    }

    return (
      <Panel className="mediaPanel">
        <div>
          <div style={{textAlign:"center"}}>
            <ButtonGroup id="mediaOptions" data-toggle="btn" btnClass="btn-info" type="tabs"
              options={options}
              onChange={this.onChangeMedia.bind(this)} />
          </div>

          <hr style={{marginTop:0}}/>

          <div className="tab-content" style={{marginTop:8}}>
            {medias}
          </div>
        </div>
      </Panel>
    );
  }
};
