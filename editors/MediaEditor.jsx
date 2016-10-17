import React from 'react';
import Editor from './Editor.jsx';
import {Tabs, TabContent, TabLink} from '../utils/Tabs.jsx';
import MediaPanel from '../panels/MediaPanel.jsx';
import BasePanel from '../panels/BasePanel.jsx';
var TabStore = require('../stores/TabStore');



export default class MediaEditor extends React.Component {
 
  constructor(props) {
    super(props);

    TabStore.loadTabs({
      MEDIA: {id:"media", title:"Media", desc:"Add Media", type:"MediaPanel", active:true},
      MEDIA2: {id:"media2", title:"Media2", desc:"Add Media", type:"MediaPanel", active:false},
    });
  }


  render() {
    return (
      <Editor className='mediaEditor'>
        
        <Tabs />
        
        <div className="tab-content">

          <TabContent tab="MEDIA">
            <MediaPanel tab="MEDIA" options={['text','icon']} type="one" />
          </TabContent>

          <TabContent tab="MEDIA2">
            <MediaPanel tab="MEDIA2" options={['text','icon']} type="one" />
          </TabContent>
        </div>

      </Editor>
    );
  }
};

