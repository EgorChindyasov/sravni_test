import {InformBlock} from '../data/types'

export type StatesType = {
	data: InformBlock
	chosenTerm: number
	chosenTargetMortage: string
	pageProductName: string
	sort: string
	isLoaded: boolean
}

export type ActionType = {
	type: string
	value?: InformBlock[]
	payload?: number | string
}

export const defaultStates = {
	isLoaded: false,
	data: [],
	termOptions: [],
	targetMortgageOptions: [],
	chosenTerm: 0,
	chosenTargetMortage: 'all',
	sort: '',
	pageProductName: ''
}

export const reducer = (state = defaultStates, action: ActionType) => {
  switch (action.type) {
		case 'SET':

			const dataTermSet: Set<number> = new Set()
			const dataNameSet: Set<string> = new Set()

			action.value.map(({rate, name}) => {
				dataTermSet.add(rate.periods[0].term.to / 12)
				dataNameSet.add(name)
			})

			return {
				...state, 
				data: action.value,
				isLoaded: true, 
				termOptions: Array.from(dataTermSet), 
				targetMortgageOptions: Array.from(dataNameSet)
			}
		case 'CHOSE_TERM': 
			return {...state, chosenTerm: action.payload}
		case 'CHOSE_TARGET_MORTAGE':
			return {...state, chosenTargetMortage: action.payload}
		case 'SET_PAGE_NAME':
			return {...state, pageProductName: action.payload}
		case 'SET_SORT':
			return {...state, sort: action.payload}
		default: 
			return state
  }
}