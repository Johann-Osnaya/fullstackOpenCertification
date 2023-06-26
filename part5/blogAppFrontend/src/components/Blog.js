import { useState } from 'react'
const Blog = ({ blog, liking, erase }) => {
	const [visibility, setVisibility] = useState(false)
	const show = { display: visibility ? '' : 'none' }
	const toggleVisibility = () => {
		setVisibility(!visibility)
	}

	const blogStyle = {
		paddinTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const upVote = () => {
		liking(blog.id)
	}

	const deleteBlog = () => {
		window.confirm(`Are you sure you want to remove blog ${blog.title} by ${blog.author}?`)
		erase(blog.id)
	}
	if (JSON.parse(localStorage.getItem('loggedBlogappUser')).username === blog.user.username) {
		return (
			<div style={blogStyle} className='showDivTest'>
				{blog.title} {blog.author}
				<button onClick={toggleVisibility}>{visibility ? 'hide' : 'show'}</button>
				<div style={show} className='testDiv'>
					{blog.url}<br/>
					likes {blog.likes}  <button onClick={upVote}>like</button><br/>
					{blog.user.name}<br/>
					<button onClick={deleteBlog}>remove</button>
				</div>
			</div>
		)
	} else {
		return (
			<div style={blogStyle} className='showDivTest'>
				{blog.title} {blog.author}
				<button onClick={toggleVisibility}>{visibility ? 'hide' : 'show'}</button>
				<div style={show} className='testDiv'>
					{blog.url}<br/>
					likes {blog.likes}  <button onClick={upVote}>like</button><br/>
					{blog.user.name}<br/>
				</div>
			</div>
		)
	}

}

export default Blog