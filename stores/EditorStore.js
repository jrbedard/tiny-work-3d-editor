var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var EditorDispatcher = require('../dispatcher/EditorDispatcher');
var EditorConstants = require('../constants/EditorConstants');

var CHANGE_EVENT = 'change';


var _todos = {};


function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos[id] = {
    id: id,
    complete: false,
    text: text
  };
}

function update(id, updates) {
  _todos[id] = assign({}, _todos[id], updates);
}

function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

function destroy(id) {
  delete _todos[id];
}

function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}



var EditorStore = assign({}, EventEmitter.prototype, {

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _todos;
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
  var text;

  switch(action.actionType) {

    case EditorConstants.TODO_CREATE:
      text = action.text.trim();
      if (text !== '') {
        create(text);
      }
      break;

    case EditorConstants.TODO_TOGGLE_COMPLETE_ALL:
      if (EditorStore.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      break;

    case EditorConstants.TODO_UNDO_COMPLETE:
      update(action.id, {complete: false});
      break;

    case EditorConstants.TODO_COMPLETE:
      update(action.id, {complete: true});
      break;

    case EditorConstants.TODO_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
      }
      break;

    case EditorConstants.TODO_DESTROY:
      destroy(action.id);
      break;

    case EditorConstants.TODO_DESTROY_COMPLETED:
      destroyCompleted();
      break;

    default:
      return true;
  }

  EditorStore.emitChange();
  return true;
});

module.exports = EditorStore;