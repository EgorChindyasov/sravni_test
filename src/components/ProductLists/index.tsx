import {
	useEffect, 
	useState 
} from 'react'
import {useSelector} from 'react-redux'
import Product from '../Product'
import Alert from '../Alert/index'
import {store} from './../../redux/store'
import {InformBlock} from '../../data/types'
import {StatesType} from '../../redux/reducers'

import './index.scss'

const START_LIST_COUNT = 10

const ProductLists = () => {
	const {data, isLoaded} = store.getState()
	const term = useSelector((state: StatesType) => state.chosenTerm)
	const targetMortgage = useSelector((state: StatesType) => state.chosenTargetMortage)
	const sortType = useSelector((state: StatesType) => state.sort)
	
	const [counterBlocks, setCounterBlocks] = useState(START_LIST_COUNT)
	const [visibleData, setVisibleData] = useState<InformBlock[]>([])
	const [pressed, setPress] = useState(false)

	useEffect(() => {
		if (isLoaded) {
			setVisibleData(data)
		}
	}, [isLoaded])

	useEffect(() => {
		if (targetMortgage == 'all') {
			term > 0
			? setVisibleData(
				sortVisibleData(data.filter((item: InformBlock) => (item.rate.periods[0].term.to / 12) <= term))
			)
			: setVisibleData(sortVisibleData(data))
		} else {
			term > 0
			? setVisibleData(
				sortVisibleData(
					data
					.filter((item: InformBlock) => item.name == targetMortgage)
					.filter((item: InformBlock) => (item.rate.periods[0].term.to / 12) <= term)
				)	
			)
			: setVisibleData(
				sortVisibleData(data.filter((item: InformBlock) => item.name == targetMortgage))
			)
		}
		
		setPress(false)
		setCounterBlocks(START_LIST_COUNT)
	}, [term, targetMortgage])

	useEffect(() => {
		if (sortType) {
			setVisibleData(sortVisibleData(visibleData))
		}
	}, [sortType])

	const sortVisibleData = (data: InformBlock[]) => {
		switch (sortType) {
			case 'rate':
				const copyData = [...data]

				copyData.sort(
					(a, b) => a.rate.periods[0].rate.from * 1000 - b.rate.periods[0].rate.from * 1000
				)
				 
				return copyData
			case 'sum':
				const dataWithTo = [...data].filter(item => item.rate.creditAmount.to)
				dataWithTo.sort((a, b) => b.rate.creditAmount.to - a.rate.creditAmount.to)

				const dataWithoutTo = [...data].filter(item => !item.rate.creditAmount.to)
				dataWithoutTo.sort((a, b) => b.rate.creditAmount.from - a.rate.creditAmount.from)
			
				return [...dataWithTo, ...dataWithoutTo]
			default:
				return data		
		}
	}

	const showMoreProductLists = () => {
		setCounterBlocks(store.getState().data.length)
		setPress(true)
	}

	const renderButton = () => {
		return pressed == false && visibleData.length > START_LIST_COUNT
		? <div className='button'>
				<button 
					type='button' 
					className='btn btn-outline-primary'
					onClick={showMoreProductLists}>
						Показать еще
				</button>
			</div>
		: null
	}

	const renderAlert = () => {
		if (visibleData.length == 0 && term > 0 && targetMortgage != 'all') {
			return <Alert message='Не удалось найти вариантов по заданным критериям' />
		}
	}

	return(
		<div className='product__lists'>
			{
				visibleData.map((item: InformBlock, idx: number) => {
					if (idx < counterBlocks) {
						return(
							<Product content={item} key={idx} />
						)
					}
				})
			}
			{renderAlert()}
			{renderButton()}
		</div>
	)
}

export default ProductLists