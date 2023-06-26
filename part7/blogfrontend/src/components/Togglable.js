import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from 'react-bootstrap'
const Togglable = forwardRef((props, refs) => {

	const [visibility, setVisibility] = useState(false)
	const hideWhenVsible = { display: visibility ? 'none' : '' }
	const showWhenVisible = { display: visibility ? '' : 'none' }

	const toggleVisibility = () => {
		setVisibility(!visibility)
	}

	useImperativeHandle(refs, () => {
		return {
			toggleVisibility
		}
	})

	return(
		<div>
			<div style={hideWhenVsible}>
				<Button variant='outline-dark' onClick={toggleVisibility}>{props.buttonLabel}</Button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<Button variant='danger' onClick={toggleVisibility}>Cancel</Button>
			</div>
		</div>
	)
})

Togglable.displayName = 'Toggable'

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired
}

export default Togglable