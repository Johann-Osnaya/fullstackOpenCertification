const Notification = ({ message, type }) => {
	if(message === null) {
		return null
	} else if (type === 'Green') {
		return (
			<div className="SuccessMessage">
				{message}
			</div>
		)
	} else {
		return (
			<div className="ErrorMessage">
				{message}
			</div>
		)
	}

}

export default Notification