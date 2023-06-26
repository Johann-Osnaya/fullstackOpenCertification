import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
const initialState = []
const blogSlice = createSlice({
	name: 'blogs',
	initialState,
	reducers: {
		appendBlog(state, action) {
			state.push(action.payload)
		},
		setBlogs(state, action)  {
			return action.payload
		},
		appendComment(state,action) {
			const newblog = state.find(blog => blog.id === action.payload.id)
			newblog.comments.push(action.payload.comment)
			setBlogs(state.map(blog => blog.id === newblog.id ? newblog : blog))
		}
	}
})

export const { setBlogs, appendBlog, appendComment } = blogSlice.actions

export const initalizeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export default blogSlice.reducer