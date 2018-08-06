import { Subject } from 'rxjs/Subject'
import * as types from './eventTypes'

export const eventSubject = new Subject()

const emit = type => (event, props, map) => eventSubject.next({ type, event, props, map })

//
//  Google Maps API events
//  These come directly from Google's docs
//
export const emitMapBoundsChanged = emit(types.MAP_BOUNDS_CHANGED)
export const emitMapCenterChanged = emit(types.MAP_CENTER_CHANGED)
export const emitMapClick = emit(types.MAP_CLICK)
export const emitMapDoubleClick = emit(types.MAP_DOUBLE_CLICK)
export const emitMapDrag = emit(types.MAP_DRAG)
export const emitMapDragEnd = emit(types.MAP_DRAG_END)
export const emitMapDragStart = emit(types.MAP_DRAG_START)
export const emitMapHeadingChanged = emit(types.MAP_HEADING_CHANGED)
export const emitMapIdle = emit(types.MAP_IDLE)
export const emitMapMaptypeIdChanged = emit(types.MAP_MAPTYPE_ID_CHANGED)
export const emitMapMouseMove = emit(types.MAP_MOUSE_MOVE)
export const emitMapMouseOut = emit(types.MAP_MOUSE_OUT)
export const emitMapMouseOver = emit(types.MAP_MOUSE_OVER)
export const emitMapProjectionChanged = emit(types.MAP_PROJECTION_CHANGED)
export const emitMapResize = emit(types.MAP_RESIZE)
export const emitMapRightClick = emit(types.MAP_RIGHT_CLICK)
export const emitMapTilesLoaded = emit(types.MAP_TILES_LOADED)
export const emitMapTiltChanged = emit(types.MAP_TILT_CHANGED)
export const emitMapZoomChanged = emit(types.MAP_ZOOM_CHANGED)
export const emitMapZoomEvent = emit(types.MAP_ZOOM_EVENT)

// Data layer events
export const emitDataAddFeature = emit(types.DATA_ADD_FEATURE)
export const emitDataClick = emit(types.DATA_CLICK)
export const emitDataDoubleClick = emit(types.DATA_DOUBLE_CLICK)
export const emitDataMouseDown = emit(types.DATA_MOUSE_DOWN)
export const emitDataMouseOut = emit(types.DATA_MOUSE_OUT)
export const emitDataMouseOver = emit(types.DATA_MOUSE_OVER)
export const emitDataMouseUp = emit(types.DATA_MOUSE_UP)
export const emitDataRemoveFeature = emit(types.DATA_REMOVE_FEATURE)
export const emitDataRemoveProperty = emit(types.DATA_REMOVE_PROPERTY)
export const emitDataRightClick = emit(types.DATA_RIGHT_CLICK)
export const emitDataSetGeometry = emit(types.DATA_SET_GEOMETRY)
export const emitDataSetProperty = emit(types.DATA_SET_PROPERTY)
