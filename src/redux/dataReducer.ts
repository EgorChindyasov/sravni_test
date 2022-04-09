import {InformBlock} from '../data/types'

export type DataStatesType = {
	data: InformBlock
	isLoaded: boolean
}

export type DataActionType = {
	type: string
	value?: InformBlock[]
}

export const defaultStates = {
	isLoaded: false,
	data: []
}

export const dataReducer = (state = defaultStates, action: DataActionType) => {
  switch (action.type) {
		case 'SET':
			return {
				...state, 
				data: action.value,
				isLoaded: true
			}
		default: 
			return state
  }
}