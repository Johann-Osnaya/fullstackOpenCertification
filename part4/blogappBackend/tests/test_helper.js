const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
	{
		title: 'The breakfast Club',
		author: 'IDK',
		url: 'http://www.nose.com',
		likes: 23
	},
	{
		title: 'Nemo',
		author: 'IDK',
		url: 'http://www.nemo.com',
		likes: 25
	}
]

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(user => user.toJSON())
}

module.exports = {
	initialBlogs, blogsInDb, usersInDb
}