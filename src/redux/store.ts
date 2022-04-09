import {
    applyMiddleware, 
    combineReducers, 
    createStore
} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {dataReducer, DataStatesType} from './dataReducer'
import {filterReducer, FilterStatesType} from './filterReducer'
import {sortReducer, SortStatesType} from './sortReducer'
import {routeReducer, RouteStatesType} from './routeReducer'

export type StatesType = {
    data: DataStatesType
    filter: FilterStatesType
    sort: SortStatesType
    route: RouteStatesType
}

const rootReducer = combineReducers(
    {
        data: dataReducer,
        filter: filterReducer,
        sort: sortReducer,
        route: routeReducer
    }
)

export const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(thunk))
)