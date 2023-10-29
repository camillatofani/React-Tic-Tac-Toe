import PropTypes from 'prop-types'

function Button({ func, title }) {
	return (
		<button onClick={ func }>{ title }</button>
	)
}

Button.propTypes = {
	func: PropTypes.func,
	title: PropTypes.string.isRequired
}

export default Button
