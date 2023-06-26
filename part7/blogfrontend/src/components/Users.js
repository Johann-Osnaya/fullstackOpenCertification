
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
const Users = ({ users }) => {

	return (
		<div>
			<h3>Users</h3>
			<Table striped>
				<tbody>
					<tr>
						<th/>
						<th>Blogs created</th>
					</tr>
					{users.map(user => {
						return (
							<tr key={user.name}>
								<td><Link className='link-dark'  to={`/users/${user.id}`}>{user.name}</Link></td>
								<td>{user.blogs.length}</td>
							</tr>

						)
					})}
				</tbody>
			</Table>
		</div>
	)

}


export default Users