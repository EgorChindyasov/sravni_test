import React from 'react'
import {
    Route, 
    Routes
} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Home from './pages/Home'
import AboutProduct from './pages/AboutProduct'
import {StatesType} from './redux/store'

const App = () => {
    const productPath = useSelector((state: StatesType) => state.route.pageProductName)

    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path={`/about/${productPath}`} element={<AboutProduct />}></Route>
        </Routes>
    ) 
}

export default App
