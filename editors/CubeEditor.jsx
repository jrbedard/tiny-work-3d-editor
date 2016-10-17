import React from 'react';

import Editor from './Editor.jsx';
import {Tabs, TabContent, TabLink} from '../utils/Tabs.jsx';
import MediaPanel from '../panels/MediaPanel.jsx';
var TabStore = require('../stores/TabStore');



export default class CubeEditor extends React.Component {
  constructor(props) {
    super(props);

    TabStore.loadTabs({
      CUBE:   {id:"cube", title:"Dice", icon:"cube", desc:"Dice", active:true},
      FACE_1: {id:"face1", title:"Face1", desc:""},
      FACE_2: {id:"face2", title:"Face2", desc:""},
      FACE_3: {id:"face3", title:"Face3", desc:""},
      FACE_4: {id:"face4", title:"Face4", desc:""},
      FACE_5: {id:"face5", title:"Face5", desc:""},
      FACE_6: {id:"face6", title:"Face6", desc:""},
    });

    // todo:
    //TabStore.setTab()...
    //TAB.CUBE.title = props.title || TAB.CUBE.title;
    //TAB.CUBE.icon = props.icon || TAB.CUBE.icon;
    //TAB.CUBE.desc = props.desc || TAB.CUBE.desc;
  }

  render() {
    return (
      <Editor className='cubeEditor'>

        <Tabs />

        <div className="tab-content">
          <TabContent tab="CUBE">
            <div>Curvy edges: <input/></div>
          </TabContent>

          <TabContent tab="FACE_1">
            <MediaPanel tab="FACE_1" options={['text','icon']} type="one" />
          </TabContent>

          <TabContent tab="FACE_2">
            <MediaPanel tab="FACE_2" options={['text','icon']} type="one" />
          </TabContent>

          <TabContent tab="FACE_3">
            <MediaPanel tab="FACE_3" options={['text','icon']} type="one" />
          </TabContent>

          <TabContent tab="FACE_4">
            <MediaPanel tab="FACE_4" options={['text','icon']} type="one" />
          </TabContent>

          <TabContent tab="FACE_5">
            <MediaPanel tab="FACE_5" options={['text','icon']} type="one" />
          </TabContent>

          <TabContent tab="FACE_6">
            <MediaPanel tab="FACE_6" options={['text','icon']} type="one" />
          </TabContent>
        </div> 
      </Editor>
    );
  }
};
