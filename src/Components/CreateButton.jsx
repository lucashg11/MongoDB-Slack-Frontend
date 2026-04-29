import React from 'react'
import Button from './Button'

const CreateButton = ({ type, text, disabled, ariaLabel, className, onClick, isLoading }) => {
	return (
		<Button 
			type={type} 
			text={text} 
			ariaLabel={ariaLabel} 
			disabled={disabled} 
			className={className} 
			onClick={onClick}
			isLoading={isLoading}
		/>
	)
}

export default CreateButton