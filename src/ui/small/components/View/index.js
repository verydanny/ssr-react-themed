import MapView from './Map'
import ListView from './List'
import FiltersView from './Filters'
import { container as ToggleBar } from './ToggleBar'

export { MapView, ListView, FiltersView, ToggleBar }

export const views = {
  map: {
    component: MapView,
    name: 'map',
    tagItem: 'map_view_button',
  },
  list: {
    component: ListView,
    name: 'list',
    tagItem: 'list_view_button',
  },
  filters: {
    component: FiltersView,
    name: 'filters',
    tagItem: 'filter',
  },
}
