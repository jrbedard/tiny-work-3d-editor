import React from 'react';
import InlineEdit from 'react-inline-edit';
import Select from 'react-select';

import Editor from './Editor.jsx';
import {Tabs, TabContent, TabLink} from '../utils/Tabs.jsx';
import Input3D from '../utils/Input3D.jsx';

var CreatorActions = require('../actions/CreatorActions');
var CreatorStore = require('../stores/CreatorStore');
var TabStore = require('../stores/TabStore');


// CREATOR
export default class Creator extends React.Component {
  constructor(props) {
    super(props);

    TabStore.loadTabs({
      LOADER: {id:"loader", title:"Loader", icon:"sign-in", active:true, desc:""},
      OBJECTS: {id:"objects", title:"Objects", icon:"cubes", desc:""},
      USER_DATA: {id:"user-data", title:"UserData", icon:"code", desc:""},
      EXPORTER: {id:"exporter", title:"Exporter", icon:"download", desc:""},
    });

    this.state = {mode:"loader"};
  }
  onLoaded(path) {
    this.setState({mode:"creator", fileName:path.fileName, fileType:path.fileType});
  }

  render() {
    return (
      <Editor className="creatorEditor">

        <Tabs />

        <div className="tab-content">
          <TabContent tab="LOADER" focus="filePath">
            <TinyLoader tab="LOADER" fileName="3" fileTypes={["OBJ","STL","TW"]} onLoaded={this.onLoaded.bind(this)} />
          </TabContent>

          <TabContent tab="OBJECTS">
            <TinyObjectEditor tab="OBJECTS" />
          </TabContent>

          <TabContent tab="USER_DATA">
            <TinyDataEditor tab="USER_DATA" />
          </TabContent>

          <TabContent tab="EXPORTER">
            <TinyExporter tab="EXPORTER" fileName={this.state.fileName} fileTypes={["TW","OBJ","STL"]}/>
          </TabContent>
        </div>

      </Editor>
    )
  }
};



// File TYPES options (for loader and exporter)
function fileTypeOptions(_this) {
  var options = [];
  for(var i=0; i<_this.props.fileTypes.length; i++) {
    var type = _this.props.fileTypes[i];
    options.push(<label key={i} className="radio-inline">
      <input type="radio" name="fileType" value={type} 
      onChange={_this.onFileTypeChange.bind(_this)} checked={_this.state.fileType==type}/>
      {type}</label>);
  }
  return options;
}



// LOADER of .OBJ/STL/TW
class TinyLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fileType:"OBJ", fileName:this.props.fileName, pathStyle:{}};
  }
  onFileTypeChange(e) { 
    this.setState({fileType: e.target.value});
  }
  onFileNameChange(e) {
    this.setState({fileName: e.target.value});
  }
  onSubmit(e) {
    e.preventDefault();
    var _this=this;
    
    creatorLoadFile(_this.state, function() { // Load File, in tiny.creator.js
      _this.props.onLoaded(_this.state); // call parent
      _this.setState({pathStyle:{color:'green'}});

      TabLink.goToTab("objects"); // go to next tab
      
    }, function(error) {
      _this.setState({pathStyle:{color:'red'}});
    });
  }
  
  render() {
    var options = fileTypeOptions(this);
    var filePath = "/piece/"+this.state.fileType.toLowerCase()+"/"+this.state.fileName+"."+this.state.fileType.toLowerCase();
    
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div>{options}</div>
          <div className="input-group">
            <input name='filePath' className="form-control" value={this.state.fileName}  focus={true} 
              onChange={this.onFileNameChange.bind(this)} />
            <span className="input-group-btn">
              <button className="btn btn-info">Load</button>
            </span>
          </div>
        </form>
        <div style={this.state.pathStyle}>{filePath}</div>
      </div>
    );
  }
};



// OBJECTS EDITOR
class TinyObjectEditor extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {text:'edit test', editing:false};
  }
  
  onChange(text) {
    //console.log(e, f);
    //this.setState({text: text});
  }
  onSave() {
    // save here
    this.setState();
  }
  onCancel() {
    this.setState();
  }
  enableEditing() {
    this.setState({editing: true});
  }
  
  render() {
    var objects = getSceneObjects(); // tiny.debug.js
    var tableObjects = [];
    for(var i=0; i<objects.length; i++) {
      var obj = objects[i];
      
      
      var row = <tr key={i}>
        <td>
        <InlineEdit tagName="td_1" className='name-field'
          onChange={this.onChange.bind(this)}
          onEnterKey={this.onSave.bind(this)}
          onEscapeKey={this.onCancel.bind(this)}
          text={obj.name}
          placeholder='Object Name'
          autoFocus={false} maxLength={200}
          editing={this.state.editing}/> 
          <span> (M)</span>
        </td>
        <td>{obj.faces}</td>
        <td>{obj.width} x {obj.height}</td>
        
        <td style={{backgroundColor:"#"+obj.material.color.getHexString()}}>{obj.material.name}</td>
      </tr>
      tableObjects.push(row);
    }
    return (
      <div>
        <table className='table table-condensed table-bordered'>
          <thead><tr><th>Objects</th><th>Polys</th><th>Dim</th><th>Material</th></tr></thead>
          <tbody>
            {tableObjects}
          </tbody>
        </table>
      </div>
    );
  }
};



// USER DATA EDITOR
class TinyDataEditor extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <table className='table table-condensed table-bordered'>
        <tbody>
          <tr><td>show mode <Input3D rotation={{x:0,y:0,z:0}} /></td></tr>
          <tr><td>print mode <Input3D rotation={{x:0,y:0,z:1}} /></td></tr>
        </tbody>
      </table>
    );
  }
};




// EXPORTER Download/Load .TW file
class TinyExporter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fileType:"TW", compress:false, print:false};
  }
  
  onFileTypeChange(e) {
    this.setState({fileType: e.target.value, compress:(e.target.value=="TW"), print:(e.target.value=="STL")});
  }
  onCompress(e) {
    this.setState({compress: e.target.checked});
  }
  onPrint(e) { // print mode: rotate/translate to be printable on platform, false = show mode: viewer
    this.setState({printMode: e.target.checked});
  }
  onSubmit(e) {
    e.preventDefault();
    var path = {fileName:this.props.fileName, fileType:this.state.fileType};
    var options = {compress:this.state.compress, print:this.state.print};
    
    creatorSaveFile(path, options); // tiny.creator.js
  }
  
  render() {
    var options = fileTypeOptions(this);
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div>{options}</div>
          <label className="checkbox-inline">
            <input name="compress" type="checkbox" disabled={(this.state.fileType=='OBJ' || this.state.fileType=='STL')} checked={(this.state.compress?'checked':'')} onChange={this.onCompress.bind(this)}/>Compress 
          </label>
          <label className="checkbox-inline">
            <input name="print" type="checkbox" disabled={(this.state.fileType=='TW')} checked={(this.state.print?'checked':'')} onChange={this.onPrint.bind(this)}/>Print Mode
          </label>
          <br/>
          <button className='btn btn-info'>Download</button>
        </form>
      </div>
    );
  }
};


