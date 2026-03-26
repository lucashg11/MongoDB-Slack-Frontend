import React from 'react'

const RegisterButton = ({ type, text, disabled, ariaLabel, className }) => {
    return (
        <button type={type} className={className} disabled={disabled} aria-label={ariaLabel}>{text}</button>
    )
}

export default RegisterButton