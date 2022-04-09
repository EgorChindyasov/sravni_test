import {useEffect} from 'react'
import {
    useDispatch, 
    useSelector
} from 'react-redux'
import Navbar from '../components/Navbar'
import Sort from '../components/SortComponent'
import ProductLists from '../components/ProductLists'
import {StatesType} from '../redux/store'
import {fetchData} from './../redux/asyncActions'

import './index.scss'

const Home = () => {
    const dispatch = useDispatch()
	const data = useSelector((state: StatesType) => state.data.data)

    useEffect(() => {
        dispatch(fetchData())
    }, [])

    return(
        <div className='container'>
            <Navbar />
            <Sort />
			<ProductLists />
            <div className='author__block'>
                <span>
                    created by <a 
                        href='https://github.com/EgorChindyasov'
                        className='link-secondary author'
                        target='_blank'>
                            Egor Chindyasov
                        </a>
                </span>
            </div>
        </div>
  )
}

export default Home