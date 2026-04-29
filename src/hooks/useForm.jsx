import { useState } from "react"

function useForm({ initialFormState, submitFn }) {
	const [formState, setFormState] = useState(
		initialFormState
	)

	function handleChangeInput(event) {
		const field_name = event.target.name
		let field_value
		if(event.target.type === 'file') {
			field_value = event.target.files[0]
		}
		else{
			field_value = event.target.value
		}
		setFormState(
			(prevFormState) => {
				return {
					...prevFormState,
					[field_name]: field_value
				}
			}
		)
	}

	function onSubmit(event) {
		event.preventDefault()
		submitFn(formState)
	}

	function resetForm() {
		setFormState(initialFormState)
	}

	return {
		handleChangeInput,
		onSubmit,
		formState,
		resetForm
	}
}

export default useForm