import React from 'react';

import If from '../utils/If.jsx'

var TabStore = require('../stores/TabStore');
var EditorActions = require('../actions/EditorActions');



function getTabsFromStore() {
  return {
    tabs: TabStore.getAll(),
    selected: TabStore.getSelected(),
  };
}

function getTabFromStore(id) {
  return TabStore.get(id);
}



// TABS (top)
export class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = getTabsFromStore();
  }

  componentDidMount() {
    $('.nav-tabs a[data-toggle="tab"]').on('shown.bs.tab', function(e) { // on tab shown
      EditorActions.tabShown(e.target.name);
    });
    TabStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    TabStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.state = getTabsFromStore();
    
    for(var i in this.state.tabs) {
      var obj = this.state.tabs[i];
      
      obj.style = (obj.edited ? {color:'green'} : {color:''}); //

    };
    this.setState(this.state.tabs);
  }


  render() {
    var tabs=[];
    for(var i in this.state.tabs) {
      var obj = this.state.tabs[i];
      if(obj.hidden) { continue; }

      var style = {paddingLeft:8, paddingRight:8};
      if(obj.style) {
        $.extend(style, obj.style);
      }

      var title = obj.desc;
      if(obj.type=="MediaPanel") {
        title += " text, icon, image";
      }
      else if(obj.type=="TextPanel") {
        title += " text";
      }

      var tab = 
        <li key={obj.id} name={obj.id} role="presentation" className={obj.active?'active':''}>
          <a name={obj.id} href={`#${obj.id}`} aria-controls={obj.id}
            role="tab" data-toggle="tab"
            title={title}
            style={style}>
            
            <If test={obj.icon}><i className={`fa fa-${obj.icon} fa-fw`}></i></If>
            <span>{obj.title}</span>
          </a>
        </li>
      tabs.push(tab);
    };

    return (
      <div className='tabs'>
        <ul className="nav nav-tabs" role="tablist">
          {tabs}
        </ul>
      </div>
    );
  }
};



// TAB CONTENT (bototm)
export class TabContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = getTabFromStore(props.tab);
  }

  componentDidMount() {
    // todo: active override

    if(!this.props.focus) { return; }

    //var focused = this.props.children.querySelector('[name="text"]')
    var focused=null;
    //console.log(focused);

    if(focused && focused.getDOMNode()) {
      focused.getDOMNode().focus(); 
    }
  }

  renderChildren() {
    var that = this;
    return React.Children.map(this.props.children, function(child) { // Pass "tab" prop to children
      //if(child.type === RadioOption.type)
        console.log(child);
        child.props.tab = that.props.tab;
        //return React.addons.cloneWithProps(child, {
        //  tab: this.props.tab
        //})
      //else
      return child;
    }.bind(this));
  }

  render() {
    return (
      <div role="tabpanel" className={`tab-pane ${this.state.active?'active':''}`}
        id={this.state.id} style={{paddingTop:"10px"}}>

        {this.props.children}
      </div>
    );
  }
};



// TAB LINK
export class TabLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = getTabFromStore(props.tab);
  }
  
  static goToTab(name) {
    $(`.nav-tabs a[name=${name}]`).tab('show'); 
  }

  onClick(e) {
    e.preventDefault();
    TabLink.goToTab(e.currentTarget.name);
  }

  render() {
    return (
      <a href="" name={this.state.id} onClick={this.onClick.bind(this)}>
        {(this.props.text ? this.props.text : this.state.desc)}
      </a>
    );
  }
};


