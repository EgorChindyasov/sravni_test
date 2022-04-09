import axios from 'axios'

export const fetchData = () => {
    return async(dispatch) => {
        const response = await axios('http://localhost:5000/')
		dispatch({type: 'SET', value: response.data.data})
    }
} 