import { Subject } from 'rxjs/Subject'
import * as types from './eventTypes'

export const eventSubject = new Subject()

const emit = type => (event, props, marker) => eventSubject.next({ type, event, props, marker })

//
//  Google Maps API Marker events
//  These come directly from Google's docs
//
export const emitMarkerAnimationChanged = emit(types.MARKER_ANIMATION_CHANGED)
export const emitMarkerClick = emit(types.MARKER_CLICK)
export const emitMarkerClickableChanged = emit(types.MARKER_CLICKABLE_CHANGED)
export const emitMarkerCursorChanged = emit(types.MARKER_CURSOR_CHANGED)
export const emitMarkerDoubleClick = emit(types.MARKER_DOUBLE_CLICK)
export const emitMarkerDrag = emit(types.MARKER_DRAG)
export const emitMarkerDragEnd = emit(types.MARKER_DRAG_END)
export const emitMarkerDraggableChanged = emit(types.MARKER_DRAGGABLE_CHANGED)
export const emitMarkerDragStart = emit(types.MARKER_DRAG_START)
export const emitMarkerFlatChanged = emit(types.MARKER_FLAT_CHANGED)
export const emitMarkerIconChanged = emit(types.MARKER_ICON_CHANGED)
export const emitMarkerMouseDown = emit(types.MARKER_MOUSE_DOWN)
export const emitMarkerMouseOut = emit(types.MARKER_MOUSE_OUT)
export const emitMarkerMouseOver = emit(types.MARKER_MOUSE_OVER)
export const emitMarkerMouseUp = emit(types.MARKER_MOUSE_UP)
export const emitMarkerPositionChanged = emit(types.MARKER_POSITION_CHANGED)
export const emitMarkerRightClick = emit(types.MARKER_RIGHT_CLICK)
export const emitMarkerShapeChanged = emit(types.MARKER_SHAPE_CHANGED)
export const emitMarkerTitleChanged = emit(types.MARKER_TITLE_CHANGED)
export const emitMarkerVisibleChanged = emit(types.MARKER_VISIBLE_CHANGED)
export const emitMarkerZIndexChanged = emit(types.MARKER_Z_INDEX_CHANGED)
