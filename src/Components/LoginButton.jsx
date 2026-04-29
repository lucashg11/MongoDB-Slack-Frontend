import React from 'react'
import Button from './Button'

const LoginButton = ({ type, text, ariaLabel, disabled, className, isLoading }) => {
	return (
		<Button 
			type={type} 
			text={text} 
			ariaLabel={ariaLabel} 
			disabled={disabled} 
			className={className} 
			isLoading={isLoading}
		/>
	)
}

export default LoginButton