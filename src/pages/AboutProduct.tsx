import React from 'react'
import {
    useDispatch, 
    useSelector
} from 'react-redux'
import {Link} from 'react-router-dom'
import Tabs from '../components/Tabs'
import {StatesType} from '../redux/reducers'
import {store} from '../redux/store'
import {InformBlock} from '../data/types'
import {getMoneyFormat} from './../lib/helpers'

import './index.scss'

const AboutProduct = () => {
    const {data} = store.getState()
    const dispatch = useDispatch()
    const productPath = useSelector((state: StatesType) => state.pageProductName)

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
                        <td>
                            {
                                rate.creditAmount.to 
                                ? <span>
                                    {getMoneyFormat(rate.creditAmount.from)} - {getMoneyFormat(rate.creditAmount.to)}
                                </span> 
                                : <span>
                                    {getMoneyFormat(rate.creditAmount.from)}
                                </span>
                            }
                        </td>
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
                        <td>{customerRequirements.age}
						    {
                                customerRequirements.age % 10 == 1 
                                ? ' год' 
                                    : [2, 3, 4].includes(customerRequirements.age % 10) 
                                    ? ' года' 
                                : ' лет'
                            }
                        </td>
                    </tr>
                    <tr>
                        <td>Стаж на последнем месте работы</td>
                        <td>{customerRequirements.lastExperience}
						    {
                                customerRequirements.lastExperience % 10 == 1 
                                ? ' месяц' 
                                    : [2, 3, 4].includes(customerRequirements.age % 10) 
                                    ? ' месяца' 
                                : ' месяцев'
                            }
                        </td>
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