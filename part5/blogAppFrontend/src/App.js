import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const  App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState(null)
	const [type, setType] = useState(null)
	const blogFormRef= useRef()

	useEffect(() => {
		const getData = async () => {
			const blogs = await BlogService.getAll()
			setBlogs(blogs)
		}
		getData()
	},[])


	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if(loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			BlogService.setToken(user.token)
		}
	},[])


	const handleLogin = async ({ username, password }) => {
		try {
			const user = await loginService.login({
				username,
				password,
			})
			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			BlogService.setToken(user.token)
			setUser(user)

		} catch (exception) {
			setMessage('Wrong credentials')
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	const handelLogout = (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null)
	}

	const logoutForm = () => (
		<form onSubmit={handelLogout}>
			<div>
				<button type="submit">logout</button>
			</div>
		</form>
	)

	const addBlog = async ({ title, author, url, likes }) => {
		try {
			blogFormRef.current.toggleVisibility()
			const blogObject = {
				title,
				author,
				url,
				likes
			}

			const returnedBlog = await BlogService.create(blogObject)
			setBlogs(blogs.concat(returnedBlog))
			setType('Green')
			setMessage(`A new blog ${title} by ${author} added`)
			setTimeout(() => {
				setMessage(null)
				setType(null)
			},5000)

		} catch (exception) {
			setMessage('Could not add blog')
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}


	}

	const updateBlog = async (id) => {
		try {
			const blog = blogs.find(b => b.id === id)
			const changedBlog = { ...blog, likes: blog.likes + 1, userId: user.id }

			const updatedBlog = await BlogService.update(id, changedBlog)
			setBlogs(blogs.map(b => b.id !== id ? b : updatedBlog))

		} catch (exception) {
			setMessage('Can\'t update likes\'')
			setTimeout(() => {
				setMessage(null)
			},5000)
		}

	}

	const eraseBlog = async (id) => {
		try {
			await BlogService.erase(id)
			const blogs = await BlogService.getAll()
			setBlogs(blogs)

		} catch (exception) {
			setMessage('Note not deleted')
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	const blogForm = () => (
		<Togglable  buttonLabel="Create blog" ref={blogFormRef}>
			<BlogForm createBlog={addBlog} />
		</Togglable>
	)

	const loginForm = () => (
		<Togglable buttonLabel="log in">
			<LoginForm loginUser={handleLogin}/>
		</Togglable>
	)


	return (
		<div>
			<h1>Blogs</h1>
			< Notification message={message} type={type} />
			{!user && loginForm()}
			{user && <div>
				<p>{user.name} logged</p>
				{logoutForm()}
				{blogForm()}
				{blogs.sort((a,b) => (a.likes > b.likes) ? -1 : 1).map(blog =>
					<Blog key={blog.id} blog={blog} liking={updateBlog} erase={eraseBlog}/>)}
			</div>}

		</div>
	)
}

export default App
