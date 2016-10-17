var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var EditorDispatcher = require('../dispatcher/EditorDispatcher');
var EditorConstants = require('../constants/EditorConstants');

var CHANGE_EVENT = 'change';

EventEmitter.prototype.setMaxListeners(30);


// Internal object of tabs
var _tabs = {}; // all tabs



// Tab Store
var TabStore = assign({}, EventEmitter.prototype, {

  // Method to load shoes from action data
  loadTabs: function(tabs) {
    _tabs = tabs;
  },


  slug: function(str) {
    if(!str) { return ""; }
    return str.replace(/\W+/g,'-').toLowerCase();
  },

  getAll: function() {
    return _tabs;
  },
  get: function(id) {
    return _tabs[id];
  },

  getTabChanged: function() {
    //return _tab; // tab that was last changed
  },
  getSelected: function() {

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
    case EditorConstants.TEXT_PANEL_UPDATE:
      break;

    case EditorConstants.TEXT_PANEL_TEXT_UPDATE:
      var text = action.text.trim();
      var tab = TabStore.get(action.id);
      tab.edited = ((text=="") ? false : true);
      break;

    default:
      return true;
  }

  TabStore.emitChange();
  return true;
});

module.exports = TabStore;