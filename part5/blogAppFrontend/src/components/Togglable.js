import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'

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
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisibility}>cancel</button>
			</div>
		</div>
	)
})

Togglable.displayName = 'Toggable'

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired
}

export default Togglable