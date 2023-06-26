import { useRef, useState } from 'react'
import Togglable from './Togglable'
import { useDispatch } from 'react-redux'
import { displayNotificaction } from '../reducers/messageReducer'
import blogService from '../services/blogs'
import { setType } from '../reducers/typeReducer'
import { appendBlog } from '../reducers/blogReducer'
import { Button } from 'react-bootstrap'

const BlogForm = () => {
	const blogref = useRef()
	const dispatch = useDispatch()
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addBlog = (event) => {
		event.preventDefault()
		createBlog({
			title,
			author,
			url,
			likes: 0,
			comments: []
		})
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	const createBlog = async ({ title, author, url, likes }) => {
		try {
			blogref.current.toggleVisibility()
			const blogObject = {
				title,
				author,
				url,
				likes
			}

			const returnedBlog = await blogService.create(blogObject)
			dispatch(appendBlog(returnedBlog))
			dispatch(setType('Green'))
			dispatch(displayNotificaction(`A new blog ${title} by ${author} added`,5))

		} catch (exception) {
			dispatch(setType('error'))
			dispatch(displayNotificaction('error adding blog, please try again',5))
		}


	}


	return (
		<div>
			<br/>
			<Togglable buttonLabel="Create blog" ref={blogref}>
				<form className='form' onSubmit={addBlog}>
					<div className='form-group'>
						<div className='form-label'>Title:</div>
						<input autoComplete='off' className='form-control' type="text" id='Title' placeholder='write a title' value={title} onChange={event => setTitle(event.target.value) }/>
						<div className='form-label'>Author:</div>
						<input autoComplete='off' className='form-control' type="text" id='Author' placeholder='write the autors name' value={author} onChange={event => setAuthor(event.target.value)}/>
						<div className='form-label'>Url:</div>
						<input autoComplete='off' className='form-control' type="text" id='Url' placeholder='write the url' value={url} onChange={event => setUrl(event.target.value)}/>
						<br/>
						<Button className='button-block' variant='dark' type='submit'>Create Blog</Button>
					</div>
				</form>
				<br/>
			</Togglable>
			<br/>
		</div>
	)
}

export default BlogForm