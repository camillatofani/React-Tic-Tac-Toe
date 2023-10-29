import PropTypes from 'prop-types'

function Title({ tag, title }) {
	const Tag = tag
	return (
		<Tag>{ title }</Tag>
	)
}

Title.propTypes = {
	tag: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
}

export default Title
