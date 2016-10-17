import React from 'react';

import Editor from './Editor.jsx';
import {Tabs, TabContent, TabLink} from '../utils/Tabs.jsx';


export default class CountryMapEditor extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Editor className="countryMapEditor">
        Country Map Editor
      </Editor>
    );
  }
};
