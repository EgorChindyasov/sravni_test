import React from 'react'
import {
    useDispatch, 
    useSelector
} from 'react-redux'
import {Link} from 'react-router-dom'
import Tabs from '../components/Tabs'
import {
    StatesType, 
    store
} from '../redux/store'
import {InformBlock} from '../data/types'
import {
    getMoneyFormat, 
    getMonth, 
    getYear
} from './../lib/helpers'

import './index.scss'

const AboutProduct = () => {
    const {data} = store.getState().data
    const dispatch = useDispatch()
    const productPath = useSelector((state: StatesType) => state.route.pageProductName)

    const helpArr = productPath.split('_')

    const productAlias = helpArr[0]
    const licenseNumber = helpArr[1]

    const product: InformBlock = data.filter(
        (item: InformBlock) => 
            item.alias == productAlias && 
            item.organization.license == licenseNumber
        )[0]

    const {name, rate, organization, customerRequirements} = product

    const onClickButton = () => {
        dispatch({type: 'SET_PAGE_NAME', payload: ''})
    }
    
    const getCreditAmount = () => {
		const creditFrom = rate.creditAmount.from
		const creditTo = rate.creditAmount.to

		return creditTo 
		? <span>{getMoneyFormat(creditFrom)} - {getMoneyFormat(creditTo)}</span> 
		: <span>{getMoneyFormat(creditFrom)}</span>
	}

    const renderConditionsTable = () => {
        return(
            <table className='table table-striped'>
                <tbody>
                    <tr>
                        <td>Наименование банка</td>
                        <td>{organization.name} (лиц. № {licenseNumber})</td>
                    </tr>
                    <tr>
                        <td>Цель</td>
                        <td>{name}</td>
                    </tr>
                    <tr>
                        <td>Срок</td>
                        <td>от {rate.periods[0].term.from} до {rate.periods[0].term.to} месяцев</td>
                    </tr>
                    <tr>
                        <td>Сумма</td>
                        <td>{getCreditAmount()}</td>
                    </tr>
                </tbody>
            </table>
        )
    }

    const renderRequirementsTable = () => {
        return(
            <table className='table table-striped'>
                <tbody>
                    <tr>
                        <td>Возраст на момент получения</td>
                        <td>
                            {customerRequirements.age} {getYear(customerRequirements.age % 10)}
                        </td>
                    </tr>
                    <tr>
                        <td>Стаж на последнем месте работы</td>
                        <td>{customerRequirements.lastExperience} {getMonth(customerRequirements.lastExperience % 10)}</td>
                    </tr>
                </tbody>
            </table>
        )
    } 

    const tabItems = [
        {
            header: 'Условия',
            component: renderConditionsTable()
        },
        {
            header: 'Требования',
            component: renderRequirementsTable()
        }
    ]

    return (
        <div className='container'>
            <div className='button'>
                <Link to='/'>	
				    <button 
				        type='button' 
					    className='btn btn-outline-primary'
                        onClick={onClickButton}
				    >
				        Назад
                    </button>
			    </Link>
            </div>
            <Tabs items={tabItems} />
        </div>
    )    
}

export default AboutProduct