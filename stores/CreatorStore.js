var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var EditorDispatcher = require('../dispatcher/EditorDispatcher');
var EditorConstants = require('../constants/EditorConstants');

var CHANGE_EVENT = 'change';



// Creator Store
var CreatorStore = assign({}, EventEmitter.prototype, {

  // get tw 


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


// register textPanel updates, tab clicks, etc.

// Register callback to handle all updates
EditorDispatcher.register(function(action) {
  
  switch(action.actionType) {

    case EditorConstants.CREATOR_FILE_LOADED:
      //tinyTabSelected(e.target.name); // tiny.editor.js
      //text = action.text.trim();
      break;


    default:
      return true;
  }

  CreatorStore.emitChange();
  return true;
});


module.exports = CreatorStore;