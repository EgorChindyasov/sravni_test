import {InformBlock} from '../data/types'

export type FilterStatesType = {
	chosenTerm: number
	chosenTargetMortage: string
}

export type FilterActionType = {
	type: string
	value?: InformBlock[]
	payload?: number | string
}

export const defaultStates = {
	termOptions: [],
	targetMortgageOptions: [],
	chosenTerm: 0,
	chosenTargetMortage: 'all',
}

export const filterReducer = (state = defaultStates, action: FilterActionType) => {
  switch (action.type) {
		case 'SET_OPTIONS':

			const dataTermSet: Set<number> = new Set()
			const dataNameSet: Set<string> = new Set()

			action.value.map(({rate, name}) => {
				dataTermSet.add(rate.periods[0].term.to / 12)
				dataNameSet.add(name)
			})

			return {
				...state, 
				termOptions: Array.from(dataTermSet), 
				targetMortgageOptions: Array.from(dataNameSet)
			}
		case 'CHOSE_TERM': 
			return {...state, chosenTerm: action.payload}
		case 'CHOSE_TARGET_MORTAGE':
			return {...state, chosenTargetMortage: action.payload}
		default: 
			return state
  }
}