import React, { useEffect } from 'react'
import useForm from '../../hooks/useForm.jsx'
import useRequest from '../../hooks/useRequest.jsx'
import Input from '../../Components/Input.jsx'
import { useNavigate, Link } from 'react-router'
import { createWorkspace } from '../../services/workspaceService.js'
import CreateButton from '../../Components/CreateButton.jsx'

const CreateWorkspaceScreen = () => {

	const {
		sendRequest,
		response,
		error,
		loading
	} = useRequest()

	const CREATE_WORKSPACE_FORM_FIELDS = {
		TITLE: 'title',
		DESCRIPTION: 'description',
		URL_IMAGE: 'url_image'
	}

	const initialFormState = {
		[CREATE_WORKSPACE_FORM_FIELDS.TITLE]: '',
		[CREATE_WORKSPACE_FORM_FIELDS.DESCRIPTION]: '',
		[CREATE_WORKSPACE_FORM_FIELDS.URL_IMAGE]: ''
	}
	const onCreateWorkspace = (formState) => {
		try {
			sendRequest(
				{
					requestCb: async () => {
						return await createWorkspace(
							{
								title: formState[CREATE_WORKSPACE_FORM_FIELDS.TITLE],
								description: formState[CREATE_WORKSPACE_FORM_FIELDS.DESCRIPTION],
								url_image: formState[CREATE_WORKSPACE_FORM_FIELDS.URL_IMAGE]
							}
						)
					}
				}
			)
		}
		catch (error) {
			console.log(error)
		}
	}
	const {
		handleChangeInput,
		onSubmit,
		formState
	} =
		useForm({
			initialFormState,
			submitFn: onCreateWorkspace
		})
	const navigate = useNavigate()
	useEffect(
		() => {
			if (response && response.ok) {
				navigate('/home')
			}
		},
		[response]
	)
	return (
		<div className='w-full min-h-screen bg-indigo-500 p-4 sm:p-6 flex items-center justify-center'>
			<div className='w-full flex flex-col bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:flex-row md:max-w-4xl md:gap-12'>
				<div className='w-full flex flex-col px-4 sm:px-8 py-6 md:py-0'>
					<h1 className='text-3xl font-semibold mb-8'>
						Crear un espacio de trabajo
					</h1>
					<form className='w-full flex flex-col gap-6 mb-8' onSubmit={onSubmit}>
						<div className='w-full flex flex-col'>
							<Input
								htmlFor="title"
								type="text"
								id="title"
								name={CREATE_WORKSPACE_FORM_FIELDS.TITLE}
								onChange={handleChangeInput}
							/>
						</div>
						<div className='w-full flex flex-col gap-2'>
							<Input
								htmlFor="description"
								type="text"
								id="description"
								name={CREATE_WORKSPACE_FORM_FIELDS.DESCRIPTION}
								onChange={handleChangeInput}
							/>
						</div>
						<div className='w-full flex flex-col gap-2 relative'>
							<Input
								htmlFor="url_image"
								type="text"
								id="url_image"
								name={CREATE_WORKSPACE_FORM_FIELDS.URL_IMAGE}
								onChange={handleChangeInput}
								value={formState[CREATE_WORKSPACE_FORM_FIELDS.URL_IMAGE]}

							/>
						</div>
						<CreateButton
							type="submit"
							text="Crear espacio"
							isLoading={loading}
							ariaLabel="Boton para crear un espacio de trabajo"
							className="w-full"
						/>
						{error && <span className='text-red-500 text-sm font-semibold text-center transition-all duration-300'>{error?.message || 'Ocurrió un error al crear el espacio de trabajo'}</span>}
						{response && !response.ok && <span className='text-red-500 text-sm font-semibold text-center transition-all duration-300'>{response.message || 'Error al crear el espacio de trabajo'}</span>}
						{response && response.ok && <span className='text-green-500 text-sm font-semibold text-center transition-all duration-300'>El espacio de trabajo se ha creado exitosamente.</span>}
					</form>
				</div>
			</div>
		</div>
	)
}

export default CreateWorkspaceScreen