import React from 'react'

const Button = ({
    type = 'button',
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    onClick,
    children,
    text,
    className = '',
    ariaLabel,
    fullWidth = false
}) => {
    const baseStyles = "inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-sm"

    const variants = {
        primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200",
        secondary: "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50",
        danger: "bg-red-500 hover:bg-red-600 text-white shadow-red-100",
        ghost: "bg-transparent hover:bg-slate-100 text-slate-500 shadow-none"
    }

    const sizes = {
        xs: "p-2 text-xs",
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base"
    }

    const widthStyle = fullWidth ? 'w-full' : ''

    const combinedClassName = `
        ${baseStyles} 
        ${variants[variant] || variants.primary} 
        ${sizes[size] || sizes.md} 
        ${widthStyle}
        ${className}
    `.replace(/\s+/g, ' ').trim()

    return (
        <button
            type={type}
            className={combinedClassName}
            disabled={disabled || isLoading}
            onClick={onClick}
            aria-label={ariaLabel || text || (typeof children === 'string' ? children : undefined)}
        >
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{text || children}</span>
                </div>
            ) : (
                text || children
            )}
        </button>
    )
}

export default Button
