var EditorDispatcher = require('../dispatcher/EditorDispatcher');
var EditorConstants = require('../constants/EditorConstants');


// General Editor Actions
var EditorActions = {

  // from utils component:

  // TAB shown : clicked or opened via code
  tabShown: function(id) {
    EditorDispatcher.dispatch({
      actionType: EditorConstants.TAB_SHOWN,
      id: id
    });
  },

  // Input3D
  
  // SizeInput

  // Slider

  // InlineEdit





  toggleComplete: function(todo) {
    var id = todo.id;
    var actionType = todo.complete ?
        TodoConstants.TODO_UNDO_COMPLETE :
        TodoConstants.TODO_COMPLETE;

    AppDispatcher.dispatch({
      actionType: actionType,
      id: id
    });
  },

  /**
   * Mark all ToDos as complete
   */
  toggleCompleteAll: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY,
      id: id
    });
  },

  /**
   * Delete all the completed ToDos
   */
  destroyCompleted: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY_COMPLETED
    });
  }

  

};

module.exports = EditorActions;