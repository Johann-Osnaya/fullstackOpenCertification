import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import { useDispatch } from 'react-redux'
import { initalizeBlogs } from '../reducers/blogReducer'
const Blogs = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		const getNotes = async () => {
			dispatch(initalizeBlogs())
		}
		getNotes()
	},[])

	const blogs = [...useSelector(state => state.blogs)]
	const user = useSelector(state => state.user)
	const blogStyle = {
		paddinTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	if(!user) {
		return null
	}

	return (
		<div>
			<BlogForm/>
			{blogs.sort((a, b) => a.likes < b.likes ? 1 : -1 ).map(blog => {
				return (
					<div style={blogStyle} key={blog.id}>
						<Link className='link-dark h5' to={`/blogs/${blog.id}`} >{blog.title}</Link>
					</div>
				)
			})}
		</div>
	)




}


export default Blogs