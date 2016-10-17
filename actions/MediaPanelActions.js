var EditorDispatcher = require('../dispatcher/EditorDispatcher');
var EditorConstants = require('../constants/EditorConstants');


// Text Panel
var TextPanelActions = {

  updateText: function(tab, text) {
    EditorDispatcher.dispatch({
      actionType: EditorConstants.TEXT_PANEL_TEXT_UPDATE,
      id: tab,
      text: text,
    });
  },

  updateIcon: function(tab, icon) {
  },
  updateImage: function(tab, image) {
  },


  updateStyle: function(tab, style) {
    EditorDispatcher.dispatch({
      actionType: EditorConstants.TEXT_PANEL_STYLE_UPDATE,
      id: tab,
      style: style,
    });
  },


  rotate: function(tab, value) {
    EditorDispatcher.dispatch({
      actionType: EditorConstants.TRANS_PANEL_ROTATE,
      id: tab,
      value: value,
    });
  },

  scale: function(tab, value) {
    EditorDispatcher.dispatch({
      actionType: EditorConstants.TRANS_PANEL_SCALE,
      id: tab,
      value: value,
    });
  },

  translate: function(tab, value) {
    EditorDispatcher.dispatch({
      actionType: EditorConstants.TRANS_PANEL_TRANSLATE,
      id: tab,
      value: value,
    });
  },

  extrude: function(tab, value) {
    EditorDispatcher.dispatch({
      actionType: EditorConstants.TRANS_PANEL_EXTRUDE,
      id: tab,
      value: value,
    });
  },
    
  
}
module.exports = TextPanelActions;
