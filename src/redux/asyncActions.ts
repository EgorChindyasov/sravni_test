import axios from 'axios'

export const fetchData = () => {
    return async(dispatch) => {
        try {
            const response = await axios('http://localhost:5000/')
		    dispatch({type: 'SET', value: response.data.data})
        } catch(error) {
            console.log('Error:', error)
        }
    }
} 