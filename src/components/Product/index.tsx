import {FC} from 'react'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {InformBlock} from '../../data/types'
import {getMoneyFormat, getYear} from '../../lib/helpers'

import './index.scss'

type ProductListType = {
	content: InformBlock
}

const Product: FC<ProductListType> = ({content}) => {
	const {name, alias, organization, rate, customerRequirements} = content
	const dispatch = useDispatch()

	const onClickButton = () => {
		dispatch({type: 'SET_PAGE_NAME', payload: `${alias}_${organization.license}`})
		dispatch({type: 'SET_SORT', payload: ''})
	}

	const getInterestRate = () => {
		return rate.periods[0].rate.from == rate.periods[0].rate.to 
		? <span className='bold__weight__super'>
			{rate.periods[0].rate.from}%
		</span> 
		: <span className='bold__weight'>
			от <span className='bold__weight__super'>{rate.periods[0].rate.from}%</span> 
		</span>
	}

	const getCreditAmount = () => {
		const creditFrom = rate.creditAmount.from
		const creditTo = rate.creditAmount.to

		return creditTo 
		? <span className='bold__weight'>
			{getMoneyFormat(creditFrom)} - {getMoneyFormat(creditTo)}
		</span> 
		: <span className='bold__weight'>
			{getMoneyFormat(creditFrom)}
		</span>
	}

	const getProductAge = () => {
		const age = customerRequirements.age

		return <span className='light__weight'>
			Возраст от {age} {getYear(age % 10)}
		</span>
	}

	const getDocuments = () => {
		const documents = customerRequirements.documents

		return <span className='light__weight'>
			{documents} 
			{
				documents == 1 ? ' документ' : 
				documents > 5 ? ' документов' : ' документа'
			}
		</span>
	}

	const getProductPeriod = () => {
		const productPeriod = rate.periods[0].term.to / 12 
		return <span className='light__weight'>
			На срок до {productPeriod} {getYear(productPeriod)}
		</span>
	}

	const getLicense = () => {
		const license = organization.license 
		
		return license 
		? <span className='light__weight'>
			лиц. № {license}
		</span>
		: null
	}

	return(
		<div className='product'>
			<div className='product__logo'>
				<img 
					src={organization.logo} 
					width='200px' 
					height='auto' />
			</div>
			<div className='product__rate__name'>
				<div className='rate__from'>
					{getInterestRate()}
				</div>
				<div className='rate__name'>
					<span className='light__weight'>
						«{name}»
					</span>
				</div>
			</div>
			<div className='product__credit__period'>
				<div className='product__credit'>
					{getCreditAmount()}
				</div>
				<div className='product__period'>
					{getProductPeriod()}
				</div> 
			</div>
			<div className='product__age__documents'>
				<div className='product__age'>
					{getProductAge()}
				</div>
				<div className='product__documents'>
					{getDocuments()}
				</div>
			</div>
			<div className='product__license_button'>
				<div className='product__license'>
					{getLicense()}
				</div>
				<div className='product__button'>
					<Link to={`/about/${alias}_${organization.license}`}>	
						<button 
							type='button' 
							className='btn btn-outline-primary'
							onClick={onClickButton}>
							Подробнее
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Product