export type RouteStatesType = {
	pageProductName: string
}

export type ActionType = {
	type: string
	payload?: number | string
}

export const defaultStates = {
	pageProductName: ''
}

export const routeReducer = (state = defaultStates, action: ActionType) => {
  switch (action.type) {
		case 'SET_PAGE_NAME':
			return {...state, pageProductName: action.payload}
		default: 
			return state
  }
}