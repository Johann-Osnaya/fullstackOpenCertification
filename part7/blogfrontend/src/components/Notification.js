import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'
const Notification = () => {
	const message = useSelector(state => state.message)
	const type = useSelector(state => state.type)
	if(message === null) {
		return null
	} else if (type === 'Green') {
		return (
			<div>
				<Alert variant='success'>{message}</Alert>
			</div>
		)
	} else {
		return (
			<div>
				<Alert variant='danger'>{message}</Alert>
			</div>
		)
	}

}



export default Notification