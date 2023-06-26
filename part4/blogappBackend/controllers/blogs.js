const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { TokenExtractor } = require('../utils/middleware')
const userExtractor = require('../utils/middleware').userExtractor


blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
	const blogs = await Blog.findById(request.params.id)
	response.json(blogs)
})

blogsRouter.post('/', userExtractor , async (request, response) => {
	const body = request.body
	const userId = request.user
	const user = await User.findById(userId)
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user.id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	await savedBlog.populate('user', { username: 1, name : 1 })

	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id',TokenExtractor , userExtractor, async (request, response) => {
	const user = request.user
	const blog = await Blog.findById(request.params.id)
	if(!blog){
		return response.status(404).send({ error: 'Blog does not exists or the token is invalid' })
	}
	if(user.toString() === blog.user._id.toString()) {
		await Blog.findByIdAndDelete(request.params.id)
		return response.status(204).end()
	}
	response.status(400).send({ error: 'Not such blog find with this user' })
})

blogsRouter.put('/:id', async (request, response) => {
	const { title, author, url, likes, userId } = request.body

	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		{ title, author, url, likes, user: userId },
		{ new: true, runValidators: true }
	)
	await updatedBlog.populate('user', { username: 1, name : 1 })

	response.json(updatedBlog)
})

module.exports = blogsRouter