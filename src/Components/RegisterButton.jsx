import React from 'react'
import Button from './Button'

const RegisterButton = ({ type, text, disabled, ariaLabel, className, isLoading }) => {
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

export default RegisterButton