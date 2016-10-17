
var keyMirror = require('keymirror');


module.exports = keyMirror({
  
  TODO_CREATE: null,
  TODO_COMPLETE: null,
  TODO_DESTROY: null,
  TODO_DESTROY_COMPLETED: null,
  TODO_TOGGLE_COMPLETE_ALL: null,
  TODO_UNDO_COMPLETE: null,


  // Creator <- twObject
  CREATOR_FILE_LOAD: null,
  CREATOR_FILE_LOADED: null,
  CREATOR_UPDATE_OBJECT: null,
  CREATOR_UPDATE_USER_DATA: null,



  // MediaPanel
  MEDIA_PANEL_UPDATE: null,
  MEDIA_PANEL_OPTION_UPDATE: null,

  // TextPanel
  TEXT_PANEL_UPDATE: null,
  TEXT_PANEL_TEXT_UPDATE: null,
  TEXT_PANEL_STYLE_UPDATE: null, // font, bold, italic, align, bevel, etc

  // TransPanel (3D Transformations)
  TRANS_PANEL_TRANSLATE: null,
  TRANS_PANEL_ROTATE: null,
  TRANS_PANEL_SCALE: null,
  TRANS_PANEL_EXTRUDE: null,

  // IconPanel
  ICON_PANEL_UPDATE: null,
  ICON_PANEL_ICON_UPDATE: null,

  // ImagePanel
  IMAGE_PANEL_UPDATE: null,
  IMAGE_PANEL_ICON_UPDATE: null,


  // BasePanel (socle under piece)
  BASE_PANEL_UPDATE: null,
  BASE_PANEL_STYLE_UPDATE: null,
  BASE_PANEL_SHAPE_UPDATE: null,
  BASE_PANEL_TEXT_UPDATE: null, // -> TextPanel


  // Tabs
  TAB_SHOWN: null,
  TAB_LINK: null,


  // Viewer
  VIEWER_EDIT_ZONE_CLICKED: null,

});