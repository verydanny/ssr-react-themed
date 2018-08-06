//
//  Google Maps API events
//

// Data layer events
export const DATA_ADD_FEATURE = 'DATA_addfeature'
export const DATA_CLICK = 'DATA_click'
export const DATA_DOUBLE_CLICK = 'DATA_dblclick'
export const DATA_MOUSE_DOWN = 'DATA_mousedown'
export const DATA_MOUSE_OUT = 'DATA_mouseout'
export const DATA_MOUSE_OVER = 'DATA_mouseover'
export const DATA_MOUSE_UP = 'DATA_mouseup'
export const DATA_REMOVE_FEATURE = 'DATA_removefeature'
export const DATA_REMOVE_PROPERTY = 'DATA_removeproperty'
export const DATA_RIGHT_CLICK = 'DATA_rightclick'
export const DATA_SET_GEOMETRY = 'DATA_setgeometry'
export const DATA_SET_PROPERTY = 'DATA_setproperty'

// These names match up to react-ui Gmap naming.
// The event string should match Google's naming,
// to make it convenient for direct API usage when necessary
export const MAP_BOUNDS_CHANGED = 'MAP_bounds_changed'
export const MAP_CENTER_CHANGED = 'MAP_center_changed'
export const MAP_CLICK = 'MAP_click'
export const MAP_DOUBLE_CLICK = 'MAP_dblclick'
export const MAP_DRAG = 'MAP_drag'
export const MAP_DRAG_END = 'MAP_dragend'
export const MAP_DRAG_START = 'MAP_dragstart'
export const MAP_HEADING_CHANGED = 'MAP_heading_changed'
export const MAP_IDLE = 'MAP_idle'
export const MAP_MAPTYPE_ID_CHANGED = 'MAP_maptypeid_changed'
export const MAP_MOUSE_MOVE = 'MAP_mousemove'
export const MAP_MOUSE_OUT = 'MAP_mouseout'
export const MAP_MOUSE_OVER = 'MAP_mouseover'
export const MAP_PROJECTION_CHANGED = 'MAP_projection_changed'
export const MAP_RESIZE = 'MAP_resize'
export const MAP_RIGHT_CLICK = 'MAP_rightclick'
export const MAP_TILES_LOADED = 'MAP_tilesloaded'
export const MAP_TILT_CHANGED = 'MAP_tilt_changed'
export const MAP_ZOOM_CHANGED = 'MAP_zoom_changed'
export const MAP_ZOOM_EVENT = 'MAP_zoom_event'
