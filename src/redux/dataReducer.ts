import {InformBlock} from '../data/types'

export type DataStatesType = {
	data: InformBlock
	isLoaded: boolean
	termOptions: number[]
	targetMortgageOptions: string[]
}

export type DataActionType = {
	type: string
	value?: InformBlock[]
}

export const defaultStates = {
	isLoaded: false,
	data: [],
	termOptions: [],
	targetMortgageOptions: [],
}

export const dataReducer = (state = defaultStates, action: DataActionType) => {
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
		default: 
			return state
  }
}