import React from 'react'
import {useDispatch} from 'react-redux'

import './index.scss'

const Sort = () => {
    const dispatch = useDispatch()

    const sortByRate = () => {
        dispatch({type: 'SET_SORT', payload: 'rate'})
    }

    const sortBySum = () => {
        dispatch({type: 'SET_SORT', payload: 'sum'})
    }

    return(
        <div className='sort__block'>
            <span>Сортировать:</span>
            <div className='sort__type'>
                <span onClick={sortByRate}>по ставке</span>
                <span onClick={sortBySum}>по сумме</span>
            </div>
        </div>
    )
}

export default Sort