import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const messageReducer = createSlice({
	name: 'message',
	initialState,
	reducers: {
		setMessage(state, action) {
			return action.payload
		},
		hideMessage() {
			return null
		}
	}

})

export const { setMessage, hideMessage } = messageReducer.actions

export const displayNotificaction = (message, time) => {
	return async dispatch => {
		dispatch(setMessage(message))
		setTimeout(() => {
			dispatch(hideMessage())
		}, time * 1000)
	}
}

export default messageReducer.reducer