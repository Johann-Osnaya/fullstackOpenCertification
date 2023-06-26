const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('total likes', () => {

	const emptyList = []

	const listWhitOneBlog = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5
		}
	]

	const listWhitManyblogs = [
		{
			title: 'The breakfast Club',
			author: 'IDK',
			url: 'http://www.nose.com',
			likes: 23,
			id: '645538b55ecfb44795f60f91'
		},
		{
			title: 'Nemo',
			author: 'IDK',
			url: 'http://www.nemo.com',
			likes: 25,
			_id: '645540b924eb5038b8f92a23'
		},
		{
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5
		}
	]

	test('of empty list is zero', () => {

		expect(listHelper.totalLikes(emptyList)).toBe(0)
	})

	test('when list has only one blog equals the likes of that', () => {
		expect(listHelper.totalLikes(listWhitOneBlog)).toBe(5)
	})

	test('of a bigger list is calculated rigth', () => {
		expect(listHelper.totalLikes(listWhitManyblogs)).toBe(53)
	})

})

