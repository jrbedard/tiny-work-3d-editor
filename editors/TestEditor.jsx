import React from 'react';

import Editor from './Editor.jsx';
import {Tabs, TabContent} from '../utils/Tabs.jsx';
import TextPanel from '../panels/TextPanel.jsx';
import ColorPicker from '../utils/ColorPicker.jsx';
import FontSelect from '../utils/FontSelect.jsx';
import Input3D from '../utils/Input3D.jsx';

var TabStore = require('../stores/TabStore');



export default class TestEditor extends React.Component {
  constructor(props) {
    super(props);

    TabStore.loadTabs({
      INPUT3D: {id:"input3d", title:"Input3D", icon:"keyboard-o", active:true, desc:""},
      TEXTPANEL: {id:"text-panel", title:"TextPanel", icon:"align-left", desc:""},
      COLORPICKER: {id:"color-picker", title:"ColorPicker", icon:"paint-brush", desc:""},
    });
  }
  

  render() {
    return (
      <Editor className="testEditor">

        <Tabs />

        <div className="tab-content">

          <TabContent tab="INPUT3D">
            <Input3D />
            <Input3D />
            <Input3D />
          </TabContent>

          <TabContent tab="TEXTPANEL">
            <TextPanel tab="TEXTPANEL" />
          </TabContent>

          <TabContent tab="COLORPICKER">
            <ColorPicker tab="COLORPICKER" />
          </TabContent>

        </div>

      </Editor>
    )
  }
  
};