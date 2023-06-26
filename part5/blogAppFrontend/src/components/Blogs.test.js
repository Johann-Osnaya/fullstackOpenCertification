import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog />', () => {
	let container
	const liking = jest.fn()
	const blog = {

		title: 'This is the title',
		author: 'This is the author',
		url: 'www.url.com',
		likes: 2,
		user: {
			name: 'Johann Osnaya'
		}
	}

	beforeEach(() => {
		container = render(
			<Blog blog={blog} liking={liking} />
		).container
	})

	test('dislplays title and author but does not rendet url and likes', () => {
		const div = container.querySelector('.showDivTest')
		expect(div).toHaveTextContent('This is the title This is the author')

		const div2 = container.querySelector('.testDiv')
		expect(div2).toHaveStyle('display: none')

	})

	test('url and number of likes are shown when the buttons is pressed', async() => {
		const user = userEvent.setup()
		const button = screen.getByRole('button')
		await user.click(button)
		const div = container.querySelector('.testDiv')
		expect(div).not.toHaveStyle('display : none')
	})

	test('when pressing the like button twice, the liking functions is called twice', async () => {
		const user =userEvent.setup()
		const like = screen.getByText('like')
		await user.click(like)
		await user.click(like)

		const callbacks = liking.mock.calls
		expect(callbacks).toHaveLength(2)

	})

})