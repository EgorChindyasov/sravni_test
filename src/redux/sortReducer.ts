export type SortStatesType = {
	sort: string
}

export type ActionType = {
	type: string
	payload?: number | string
}

export const defaultStates = {
	sort: ''
}

export const sortReducer = (state = defaultStates, action: ActionType) => {
  switch (action.type) {
		case 'SET_SORT':
			return {...state, sort: action.payload}
		default: 
			return state
  }
}