import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './reducers/messageReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import typeReducer from './reducers/typeReducer'
import {  BrowserRouter as Router } from 'react-router-dom'

const store = configureStore({
	reducer: {
		blogs: blogReducer,
		user: userReducer,
		message: messageReducer,
		type: typeReducer
	}
})

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
)
