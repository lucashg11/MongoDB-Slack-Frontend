import React from 'react'

const LoginButton = ({ type, text, ariaLabel, disabled, className }) => {
	return (
		<button type={type} className={className} aria-label={ariaLabel} >{text}</button>
	)
}

export default LoginButton