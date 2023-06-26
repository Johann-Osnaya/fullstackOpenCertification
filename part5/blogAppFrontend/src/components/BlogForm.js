import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const addBlog = (event) => {
		event.preventDefault()
		createBlog({
			title,
			author,
			url,
			likes: 0
		})
		setTitle('')
		setAuthor('')
		setUrl('')
	}


	return (
		<div>
			<form onSubmit={addBlog}>
				<div>
				Title:<input type="text" id='Title' placeholder='write a title' value={title} onChange={event => setTitle(event.target.value) }/>
					<br/>
				Author:<input type="text" id='Author' placeholder='write the autors name' value={author} onChange={event => setAuthor(event.target.value)}/>
					<br/>
					Url:<input type="text" id='Url' placeholder='write the url' value={url} onChange={event => setUrl(event.target.value)}/>
				</div>
				<button id='createBlog' type="submit">create</button>
			</form>
		</div>
	)
}

export default BlogForm