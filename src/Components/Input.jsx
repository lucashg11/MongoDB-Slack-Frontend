import React from 'react'

const Input = ({ type = 'text', name, value, onChange, placeholder, label, required = false, className = '' }) => {
	return (
		<div className="w-full">
			{label && (
				<label className='block text-sm font-semibold text-slate-700 mb-1.5' htmlFor={name}>
					{label}
				</label>
			)}
			<input 
				type={type} 
				id={name}
				name={name} 
				value={value} 
				onChange={onChange} 
				placeholder={placeholder}
				required={required}
				className={`
					w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl 
					focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
					transition-all outline-none text-slate-700 placeholder-slate-400
					${className}
				`.replace(/\s+/g, ' ').trim()} 
			/>
		</div>
	)
}

export default Input