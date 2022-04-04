import {FC} from 'react'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {InformBlock} from '../../data/types'
import {getMoneyFormat} from '../../lib/helpers'

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
					{
						rate.periods[0].rate.from == rate.periods[0].rate.to 
						? <span className='bold__weight__super'>
							{rate.periods[0].rate.from}%
						</span> 
						: <span className='bold__weight'>
							от <span className='bold__weight__super'>{rate.periods[0].rate.from}%</span> 
						</span>
					}
				</div>
				<div className='rate__name'>
					<span className='light__weight'>
						«{name}»
					</span>
				</div>
			</div>
			<div className='product__credit__period'>
				<div className='product__credit'>
					{
						rate.creditAmount.to 
						? <span className='bold__weight'>
							{getMoneyFormat(rate.creditAmount.from)} - {getMoneyFormat(rate.creditAmount.to)}
						</span> 
						: <span className='bold__weight'>
							{getMoneyFormat(rate.creditAmount.from)}
						</span>
					}
				</div>
				<div className='product__period'>
					<span className='light__weight'>
						На срок до {rate.periods[0].term.to / 12}
						{rate.periods[0].term.to / 12 % 10 == 1 ? ' года' : ' лет'}
					</span>
				</div> 
			</div>
			<div className='product__age__documents'>
				<div className='product__age'>
					<span className='light__weight'>
						Возраст от {customerRequirements.age}
						{customerRequirements.age % 10 == 1 ? ' года' : ' лет'}
					</span>
				</div>
				<div className='product__documents'>
					<span className='light__weight'>
						{customerRequirements.documents}
						{customerRequirements.documents == 1 ? ' документ' : 
						customerRequirements.documents > 5 ? ' документов' : ' документа'}
					</span>
				</div>
			</div>
			<div className='product__license_button'>
				<div className='product__license'>
					{	
						organization.license 
						? <span className='light__weight'>
							лиц. № {organization.license}
						</span>
						: null
					}
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