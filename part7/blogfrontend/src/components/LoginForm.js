import { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import BlogService from '../services/blogs'
import { displayNotificaction } from '../reducers/messageReducer'
import { setType } from '../reducers/typeReducer'
import { setUser } from '../reducers/userReducer'
import Togglable from './Togglable'
import { Button } from 'react-bootstrap'
const LoginForm = () => {
	const dispatch = useDispatch()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const login = (event) => {
		event.preventDefault()
		handleLogin({
			username,
			password
		})
		setPassword('')
		setUsername('')
	}

	const handleLogin = async ({ username, password }) => {
		try {
			const user = await loginService.login({
				username,
				password,
			})
			window.localStorage.setItem(
				'loggedBlogappUser', JSON.stringify(user)
			)
			BlogService.setToken(user.token)
			dispatch(setUser(user))
			dispatch(setType('Green'))
			dispatch(displayNotificaction(`logged as ${username}`, 5))

		} catch (exception) {
			dispatch(setType('error'))
			dispatch(displayNotificaction('Wrong credentials', 5))
		}
	}
	return (
		<Togglable buttonLabel ="Login">
			<h2>Login</h2>

			<form onSubmit={login} className='form'>
				<div className='form-group'>
					<div className='form-label'>Username:</div>
					<input className='form-control'
						value={username}
						onChange={event => setUsername(event.target.value)}
					/>
				</div>
				<div className='form-group'>
					<div className='form-label'>Password:</div>
					<input className='form-control'
						type="password"
						value={password}
						onChange={event => setPassword(event.target.value)}
					/>
				</div>
				<br/>
				<Button className='form-control' variant='success' type="submit">Login</Button>
			</form>
			<br/>
		</Togglable>

	)
}

export default LoginForm