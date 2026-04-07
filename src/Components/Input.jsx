import React from 'react'

const Input = ({ type, name, value, onChange, htmlFor }) => {
	return (
		<>
			<label className='uppercase' htmlFor={htmlFor}>{name}</label>
			<input type={type} name={name} value={value} onChange={onChange} className="border-b-2 border-slate-300 outline-none focus:outline-none" />
		</>
	)
}

export default Input