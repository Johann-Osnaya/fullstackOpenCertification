import { useEffect, useState } from 'react'
import Blogs from './components/Blogs.js'
import BlogService from './services/blogs'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initalizeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import Users from './components/Users'
import { Routes, Route, useMatch } from 'react-router-dom'
import userService from './services/users'
import User from './components/User'
import Blog from './components/Blog.js'
import Menu from './components/Menu.js'
import LoginForm from './components/LoginForm.js'

const  App = () => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const [users, setUsers] = useState([])
	const match = useMatch('/users/:id')
	const oneUser =  match
		? users.find(user => user.id === match.params.id)
		: null


	const blogs = useSelector(state => state.blogs)
	const match2 = useMatch('/blogs/:id')
	const blog = match2
		? blogs.find(blog => blog.id === match2.params.id)
		: null

	useEffect(() => {
		const callUsers = async () => {
			const userdata = await userService.getUsers()
			setUsers(userdata)
		}
		callUsers()
	},[blogs])


	useEffect(() => {
		dispatch(initalizeBlogs())
	},[dispatch])


	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if(loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))
			BlogService.setToken(user.token)
		}
	},[])



	return (
		<div className='container'>
			<h1>Blog App</h1>
			<p>By Johann Osnaya, 2023</p>
			<div>
				<Notification style={{ padding: 5 }} />
				{user &&<Menu />}
				{!user && <LoginForm />}
			</div>
			<Routes>
				<Route  path='/' element={<Blogs />} />
				<Route path='/blogs' element={<Blogs />}/>
				<Route path='/users' element={<Users users={users} />} />
				<Route path='/users/:id' element={<User user={oneUser}/>} />
				<Route path='/blogs/:id' element={<Blog blog={blog} />} />
			</Routes>
		</div>
	)
}

export default App
