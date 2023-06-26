import { createSlice } from "@reduxjs/toolkit";
const initialState = ''
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setMessage(state, action) {
            return action.payload
        },
        hideNotification(state, action) {
            return ''
        }
    }

})

export const {setMessage,hideNotification } = notificationSlice.actions

export const displayNotification = (message, time) => {
    return async dispatch => {
        dispatch(setMessage(message))
        setTimeout(() => {
            dispatch(hideNotification())
        },time * 1000)
    }
}

export default notificationSlice.reducer