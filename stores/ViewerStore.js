var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var EditorDispatcher = require('../dispatcher/EditorDispatcher');
var EditorConstants = require('../constants/EditorConstants');

var CHANGE_EVENT = 'change';



// Viewer Store
var ViewerStore = assign({}, EventEmitter.prototype, {

  get3DText: function(id) {
    if(!twObject || !twObject.texts) { return {} }
    return twObject.texts[id] || {};
  },


  // todo: inherit these 3?
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});



// Register callback to handle all updates
EditorDispatcher.register(function(action) {
  
  switch(action.actionType) {

    case EditorConstants.TAB_SHOWN:
      tinyLookAt(action.id); // tiny.editor.js
      break;


    case EditorConstants.TEXT_PANEL_TEXT_UPDATE: // changed text
      ViewerStore.get3DText(action.id).updateText(action.text.trim()); // tiny.text.js
      break;

    case EditorConstants.TEXT_PANEL_STYLE_UPDATE: // changed font / text style
      ViewerStore.get3DText(action.id).updateStyle(action.style); // tiny.text.js
      break;

    case EditorConstants.TRANS_PANEL_ROTATE:
      ViewerStore.get3DText(action.id).rotate(action.value); // tiny.text.js
      break;

    case EditorConstants.TRANS_PANEL_TRANSLATE:
      ViewerStore.get3DText(action.id).translate(action.value); // tiny.text.js
      break;

    case EditorConstants.TRANS_PANEL_SCALE:
      ViewerStore.get3DText(action.id).scale(action.value); // tiny.text.js
      break;

    case EditorConstants.TRANS_PANEL_EXTRUDE:
      ViewerStore.get3DText(action.id).extrude(action.value); // tiny.text.js
      break;

    default:
      return true;
  }

  ViewerStore.emitChange();
  return true;
});


module.exports = ViewerStore;