import { useState } from 'react'
import PropTypes from 'prop-types'
const LoginForm = ({ loginUser }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const login = (event) => {
		event.preventDefault()
		loginUser({
			username,
			password
		})
		setPassword('')
		setUsername('')
	}
	return (
		<div>
			<h2>Login</h2>

			<form onSubmit={login}>
				<div>
			username
					<input
						value={username}
						onChange={event => setUsername(event.target.value)}
					/>
				</div>
				<div>
			password
					<input
						type="password"
						value={password}
						onChange={event => setPassword(event.target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>

	)
}

LoginForm.propTypes = {
	loginUser: PropTypes.func.isRequired
}

export default LoginForm