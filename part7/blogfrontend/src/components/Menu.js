import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { displayNotificaction } from '../reducers/messageReducer'
import { deleteUser } from '../reducers/userReducer'
import LoginForm from './LoginForm'
import { Form,Button, Container, Nav,  Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
const Menu = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const padding = {
		padding: 5
	}

	const user = useSelector(state => state.user)

	const handleLogout = (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedBlogappUser')
		dispatch(displayNotificaction('Logged out',5))
		dispatch(deleteUser())
		navigate('/')

	}

	if(user) {
		return (
			<Navbar bg='dark' variant='dark' >
				<Container fluid>
					<Nav className='navbarscroll'>
						<LinkContainer to={'/blogs'}>
							<Nav.Link>Blogs</Nav.Link>
						</LinkContainer>
						<LinkContainer  to={'/users'}>
							<Nav.Link style={padding}>Users</Nav.Link>
						</LinkContainer>
					</Nav>
					<Navbar.Text>{`${user.name} logged in `}</Navbar.Text>
					<Form>
						<Button  type='submit' variant='outline-light' size='sm' onClick={handleLogout}>Logout</Button>
					</Form>
				</Container>
			</Navbar>
		)
	} else {
		return (
			<div >
				<LoginForm/>
			</div>
		)
	}


}

export default Menu