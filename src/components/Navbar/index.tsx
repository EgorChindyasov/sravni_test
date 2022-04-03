import {
	FC, 
	useState, 
	ChangeEvent
} from 'react'
import {useDispatch} from 'react-redux'
import {store} from './../../redux/store'
import {getMoneyFormat} from './../../lib/helpers'

import './index.scss'

const Navbar: FC = () => {
	const dispatch = useDispatch()
	const {targetMortgageOptions, termOptions} = store.getState()
	
	const [range, setRange] = useState('')
	const [initialFee, setinitialFee] = useState('')

	const onChangeRange = (event: ChangeEvent<HTMLInputElement>) => {
		setRange(
			getMoneyFormat(Number(event.target.value))
		)
	}

	const onChangeTerm = (event: ChangeEvent<HTMLSelectElement>) => {
		dispatch({type: 'CHOSE_TERM', payload: Number(event.target.value)})
	}

	const onChangeTargetMortgage = (event: ChangeEvent<HTMLSelectElement>) => {
		dispatch({type: 'CHOSE_TARGET_MORTAGE', payload: event.target.value})
	}

	const onChangeInitialFee = (event: ChangeEvent<HTMLInputElement>) => {
		setinitialFee(
			getMoneyFormat(Number(event.target.value))
		)
	}

	return(
		<div className='container__navbar'>
			<div className='header'>
				<div className='header__text'>
					Ипотечный калькулятор
				</div>
			</div>
			<div className='calculator'>
				<div className='calculator__block'>
					<p>Цель ипотеки</p>
					<select 
						className='form-select select' 
						onChange={onChangeTargetMortgage}>
						<option 
							value='all' 
							selected>
								Любая
						</option>
						{targetMortgageOptions.map((option: string, idx: number) => {
							return <option 
										value={option} 
										key={idx}>
											{option}
									</option>
						})}
					</select>
				</div>
				<div className='calculator__block'>
					<p>Стоимость недвижимости</p>
					<input 
						type='text' 
						className='form-control' 
						value={range} />
					<input 
						type='range' 
						className='form-range' 
						min='0' 
						max='99000000' 
						step='1' 
						onChange={onChangeRange} />
				</div>
				<div className='calculator__block'>
					<p>Первоначальный взнос</p>
					<input 
						type='text' 
						className='form-control' 
						value={initialFee} />
					<input 
						type='range' 
						className='form-range' 
						min='0' 
						max='99000000' 
						step='1' 
						onChange={onChangeInitialFee} />
				</div>
				<div className='calculator__block'>
					<p>Срок</p>
					<select 
						className='form-select select' 
						onChange={onChangeTerm}>
						<option 
							value='0' 
							selected>
								Любой
						</option>
						{termOptions.sort().map((option: number, idx: number) => {
							return (
								<option 
									value={option} 
									key={idx}>
									{option}
									{
										option == 1 ? ' год' :
										option < 5 ? ' года' : ' лет' 
									}
								</option>
							)
						})}
					</select>
				</div>
			</div>
		</div>
	)
}

export default Navbar