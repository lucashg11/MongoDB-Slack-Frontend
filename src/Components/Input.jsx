import React from 'react'

const Input = ({ type, name, value, onChange, htmlFor }) => {
	return (
		<>
			<label className='uppercase text-sm font-medium text-slate-700 block mb-2 transition-colors duration-200' htmlFor={htmlFor}>{name}</label>
			<input type={type} name={name} value={value} onChange={onChange} className="w-full px-3 py-2 border-b-2 border-slate-300 bg-transparent outline-none focus:outline-none focus:border-indigo-500 transition-colors duration-300 placeholder-slate-400" />
		</>
	)
}

export default Input