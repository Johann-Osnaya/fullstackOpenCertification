const moongose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')



beforeEach(async () => {
	await Blog.deleteMany({})

	let blogObjects = helper.initialBlogs
		.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
})



test('blogs are returned as a json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all the blogs are returned', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog has property id', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body[0].id).toBeDefined()
})

test('creating a new blog works', async () => {
	const blogObject = {
		title: 'Orange is the new black',
		author: 'Johan Bhauman',
		url: 'aquiva.com',
		likes: 24
	}
	await api
		.post('/api/blogs')
		.send(blogObject)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

	const titles = blogsAtEnd.map(blog => blog.title)
	expect(titles).toContain(
		'Orange is the new black'
	)
})

test('a especific blog is deleted', async () => {
	const blogsAtStart = await helper.blogsInDb()
	const blogToDelete = blogsAtStart[0]

	await api
		.delete(`/api/blogs/${blogToDelete.id}`)
		.expect(204)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(
		helper.initialBlogs.length - 1
	)


	const titles = blogsAtEnd.map(b => b.title)

	expect(titles).not.toContain(blogToDelete.title)
})

test('updating the number of likes works', async () => {
	const blogsAtStart = await helper.blogsInDb()
	const blogToUpdate = blogsAtStart[0]

	await api
		.put(`/api/blogs/${blogToUpdate.id}`)
		.send({ ...blogToUpdate, likes: 30 })
		.expect(200)
	const blogsAtEnd = await helper.blogsInDb()
	const updatedBlog = blogsAtEnd[0]
	expect(updatedBlog.likes).toBe(30)
})

describe('invalid user', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', passwordHash })
		await user.save()
	})

	test('returns a appropiate status', async () => {
		const user = { username: 'nd', password: 'w' }
		const usersAtStart = await helper.usersInDb()
		const response = await api
			.post('/api/users')
			.send(user)
			.expect(400)
		expect(response.body.error).toContain('length')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})
})

afterAll(async () => {
	await moongose.connection.close()
})