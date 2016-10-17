var EditorDispatcher = require('../dispatcher/EditorDispatcher');
var EditorConstants = require('../constants/EditorConstants');


// Viewer actions (actions in viewer that affects the editor)
var ViewerActions = {

  editZoneClick: function(id, name) {
    EditorDispatcher.dispatch({
      actionType: EditorConstants.VIEWER_EDIT_ZONE_CLICKED,
      name: name
    });
  },
  editZoneDoubleClick: function(id, name) {
    EditorDispatcher.dispatch({
      actionType: EditorConstants.VIEWER_EDIT_ZONE_CLICKED,
      name: name
    });
  },

  // double click object
  // ?

}

module.exports = ViewerActions;