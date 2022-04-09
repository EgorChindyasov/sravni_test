export type FilterStatesType = {
	chosenTerm: number
	chosenTargetMortage: string
}

export type FilterActionType = {
	type: string
	payload?: number | string
}

export const defaultStates = {
	chosenTerm: 0,
	chosenTargetMortage: 'all',
}

export const filterReducer = (state = defaultStates, action: FilterActionType) => {
  switch (action.type) {
		case 'CHOSE_TERM': 
			return {...state, chosenTerm: action.payload}
		case 'CHOSE_TARGET_MORTAGE':
			return {...state, chosenTargetMortage: action.payload}
		default: 
			return state
  }
}