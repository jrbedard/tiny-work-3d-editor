// TINY EDITOR APP
import React from 'react';

var Viewer = require('./editors/Viewer.jsx');

var EDITORS = {
  "Creator":          require('./editors/Creator.jsx'),
  "MediaEditor":      require('./editors/MediaEditor.jsx'),
  "BikeEditor":       require('./editors/BikeEditor.jsx'),
  "CountryMapEditor": require('./editors/CountryMapEditor.jsx'),
  "GenericEditor":    require('./editors/GenericEditor.jsx'),
  "CubeEditor":       require('./editors/CubeEditor.jsx'),
  "TestEditor":       require('./editors/TestEditor.jsx'),
};



export default class TinyEditor extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    $(".btn").focus(function() {
      $(this).css({outline:"none"}); // remove highlights on mac chrome
    });

    $(document).on('shown.bs.tooltip', function(e) {
      setTimeout(function () {
        $(e.target).tooltip('hide'); // hide tooltip after 5sec 
      }, 5000);
    });
    // bootstrap.slider.min.js tooltips offset problem -> search "this._over=" add ",this.layout()" before ",this._over="
  }


  render() {
    var Editor = "";
    if(piece && piece.editor && piece.editor in EDITORS) { // from tiny.viewer.js
      Editor = EDITORS[piece.editor];
    } else {
      Editor = EDITORS["GenericEditor"];
    }
    
    return (
      <div>
        <Viewer />  
        <div className="tinyEditorGUI">
          <Editor/>
        </div>
      </div>
    );
  }
};
