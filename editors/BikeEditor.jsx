import React from 'react';

import Editor from './Editor.jsx';
import {Tabs, TabContent, TabLink} from '../utils/Tabs.jsx';
import MediaPanel from '../panels/MediaPanel.jsx';
import BasePanel from '../panels/BasePanel.jsx';
var TabStore = require('../stores/TabStore');



export default class BikeEditor extends React.Component {
 
  constructor(props) {
    super(props);

    TabStore.loadTabs({
      BIKE: {id:"bike", title:"Bike", icon:"bicycle", desc:"General Biking", active:true},
  
      FRONT_WHEEL: {id:"front-wheel", title:"Front Wheel", desc:"Add Front Wheel", type:"MediaPanel"},
      BACK_WHEEL: {id:"back-wheel", title:"Back Wheel", desc:"Add Back Wheel", type:"MediaPanel"},

      BASE: {id:"base", title:"Base", desc:"Add a Base under the bike", hidden:true},
    });
  }


  render() {
    return (
      <Editor className='bikeEditor'>
        
        <Tabs />
        
        <div className="tab-content">
          <TabContent tab="BIKE">
            <p>Desc, Options:</p>
            <ul className='list'>
              <li><TabLink tab="FRONT_WHEEL" /></li>
              <li><TabLink tab="BACK_WHEEL" /></li>
              <li><TabLink tab="BASE" /></li>
            </ul>
          </TabContent>

          <TabContent tab="FRONT_WHEEL">
            <MediaPanel tab="FRONT_WHEEL" options={['text','icon']} type="one" />
          </TabContent>

          <TabContent tab="BACK_WHEEL">
            <MediaPanel tab="BACK_WHEEL" options={['text','icon']} type="one" />
          </TabContent>

          <TabContent tab="BASE">
            <BasePanel tab="BASE" />
          </TabContent>
        </div>

      </Editor>
    );
  }
};

