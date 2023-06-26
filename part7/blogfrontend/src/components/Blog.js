import { appendComment, setBlogs } from '../reducers/blogReducer'
import { setType } from '../reducers/typeReducer'
import blogService from '../services/blogs'
import { displayNotificaction } from '../reducers/messageReducer'
import { useDispatch, useSelector } from 'react-redux'
import {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
const Blog = ({ blog }) => {
	const dispatch = useDispatch()
	const user = useSelector(state => state.user)
	const blogs = useSelector(state => state.blogs)
	const [comment, setComment] = useState('')
	const navigate = useNavigate()

	if(!user || !blog) {
		return null
	}
	const updateBlog = async (id) => {
		try {
			const blog = blogs.find(b => b.id === id)
			const changedBlog = { ...blog, likes: blog.likes + 1, userId: user.id }

			const updatedBlog = await blogService.update(id, changedBlog)
			dispatch(setBlogs(blogs.map(b => b.id !== id ? b : updatedBlog)))

		} catch (exception) {
			dispatch(setType('error'))
			dispatch(displayNotificaction('error updating likes, please try again', 5))
		}

	}


	const removeblog = () =>  {
		window.alert(`are you sure you wanto to delete ${blog.title}?`)
		deleteBlog()
	}

	const deleteBlog = async () => {
		try{
			await blogService.erase(blog.id)
			dispatch(displayNotificaction('blog deleted', 5))
			navigate('/blogs')
		} catch(exception) {
			dispatch(displayNotificaction('error deleting the blog, please try again', 5))
		}
	}

	const voteBlog = (id) => {
		updateBlog(id)
	}

	const handleCommentChange = ({ target }) => {
		setComment(target.value)
	}

	const sendcomment = (event) => {
		event.preventDefault()
		console.log(blog.id)
		makeAComment()

	}

	const makeAComment = async () => {
		try {
			console.log(comment)
			const newcomment = await blogService.createComment(blog.id, { comment })
			dispatch(appendComment({ id: blog.id, comment: newcomment }))
			setComment('')
		} catch (exception) {
			dispatch(setType('error'))
			dispatch(displayNotificaction('error adding blog, please try again',5))
		}

	}


	if(user.username === blog.user.username) {
		return (
			<div>
				<h2>{blog.title}</h2>
				<a target='_blank' href={blog.url}  rel='noopener noreferrer external' className='link-dark'>{blog.url}</a>
				<br/>
				<br/>
				{blog.likes} likes <Button size='sm' variant='dark' onClick={() => voteBlog(blog.id)}>Like</Button>
				<br/>
				<br/>
				added by {blog.user.name}
				<br/>
				<br/>
				<Button size='sm' variant='danger' onClick={removeblog}>Remove</Button>
				<br/>
				<br/>
				<h1>Comments</h1>
				<ul>
					{blog.comments.map(comment => <li key={comment}>{comment}</li>)}
				</ul>
				<form className='form' onSubmit={sendcomment} >
					<div className='form-label'>Leave a comment:</div>
					<br/>
					<input className='form-control'  value={comment} onChange={handleCommentChange}/>
					<br/>
					<Button className='form-control' variant='success' type='submit'>Comment</Button>
				</form>
			</div>
		)
	} else {
		return (
			<div>
				<h2>{blog.title}</h2>
				<a className='link-dark' href={blog.url}>{blog.url}</a>
				<br/>
				<br/>
				{blog.likes} likes <Button size='sm' variant='dark' onClick={() => voteBlog(blog.id)}>Like</Button><br/>
				added by {blog.user.name}
				<br/>
				<br/>
				<h1>Comments</h1>
				<ul>
					{blog.comments.map(comment => <li key={comment}>{comment}</li>)}
				</ul>
				<form className='form' onSubmit={sendcomment} >
					<div className='form-label'>Leave a comment:</div>
					<br/>
					<input autoComplete='off' className='form-control'  value={comment} onChange={handleCommentChange}/>
					<br/>
					<Button className='form-control' variant='success' type='submit'>Comment</Button>
				</form>
			</div>
		)
	}


}

export default Blog