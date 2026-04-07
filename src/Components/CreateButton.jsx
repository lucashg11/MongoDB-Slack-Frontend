import React from 'react'

const CreateButton = ({ type, text, disabled, ariaLabel, className, onClick }) => {
	return (
		<button type={type} className={className} disabled={disabled} aria-label={ariaLabel} onClick={onClick}>{text}</button>
	)
}

export default CreateButton