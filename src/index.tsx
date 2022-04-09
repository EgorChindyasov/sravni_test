import React from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import {store} from './redux/store'

import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

const container = createRoot(document.getElementById('root'))
container.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
)
