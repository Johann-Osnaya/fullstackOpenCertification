import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


test('Creating a blog calls the expected funciton' , async () => {
	const createBlog = jest.fn()

	render( <BlogForm createBlog={createBlog} />)

	const  titleInput = screen.getByPlaceholderText('write a title')
	const authorInput = screen.getByPlaceholderText('write the autors name')
	const urlInput = screen.getByPlaceholderText('write the url')
	const submitButton = screen.getByText('create')

	await userEvent.type(titleInput, 'The Breakfast Club')
	await userEvent.type(authorInput, 'Ana Briseida')
	await userEvent.type(urlInput, 'www.twitter.com')
	await userEvent.click(submitButton)

	expect(createBlog.mock.calls).toHaveLength(1)
	expect(createBlog.mock.calls[0][0].title).toBe('The Breakfast Club')
	expect(createBlog.mock.calls[0][0].author).toBe('Ana Briseida')
	expect(createBlog.mock.calls[0][0].url).toBe('www.twitter.com')
})