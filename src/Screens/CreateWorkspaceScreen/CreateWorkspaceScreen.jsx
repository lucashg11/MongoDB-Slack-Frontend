import React, { useEffect, useState, useRef } from 'react'
import useForm from '../../hooks/useForm.jsx'
import useRequest from '../../hooks/useRequest.jsx'
import Input from '../../Components/Input.jsx'
import { useNavigate, Link } from 'react-router'
import { createWorkspace } from '../../services/workspaceService.js'
import { uploadImage } from '../../services/userService.js'
import CreateButton from '../../Components/CreateButton.jsx'
import { HiOutlineCamera } from 'react-icons/hi'

const CreateWorkspaceScreen = () => {
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef(null)

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
		formState,
        setFormState
	} = useForm({
			initialFormState,
			submitFn: onCreateWorkspace
		})

	const navigate = useNavigate()

	useEffect(() => {
		if (response && response.ok) {
			navigate('/home')
		}
	}, [response])

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setIsUploading(true)
        try {
            const response = await uploadImage(file, 'workspaces')
            if (response.ok) {
                setFormState(prev => ({
                    ...prev,
                    [CREATE_WORKSPACE_FORM_FIELDS.URL_IMAGE]: response.data.url
                }))
            }
        } catch (err) {
            console.error('Error uploading image:', err)
        } finally {
            setIsUploading(false)
        }
    }

	return (
		<div className='w-full min-h-screen bg-indigo-500 p-4 sm:p-6 flex items-center justify-center'>
			<div className='w-full flex flex-col bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:flex-row md:max-w-4xl md:gap-12'>
				<div className='w-full flex flex-col px-4 sm:px-8 py-6 md:py-0'>
					<h1 className='text-3xl font-semibold mb-8 text-slate-800'>
						Crear un espacio de trabajo
					</h1>
					<form className='w-full flex flex-col gap-6 mb-8' onSubmit={onSubmit}>
                        
                        <div className="flex flex-col items-center gap-4 mb-2">
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-2xl bg-indigo-50 overflow-hidden border-2 border-indigo-100 shadow-inner flex items-center justify-center font-bold text-3xl text-indigo-300">
                                    {formState[CREATE_WORKSPACE_FORM_FIELDS.URL_IMAGE] ? (
                                        <img src={formState[CREATE_WORKSPACE_FORM_FIELDS.URL_IMAGE]} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <HiOutlineCamera className="w-10 h-10" />
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-all active:scale-90"
                                    disabled={isUploading}
                                >
                                    <HiOutlineCamera className="w-5 h-5" />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                {isUploading && (
                                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-2xl">
                                        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-slate-500 font-medium italic">Sube una imagen para tu workspace</p>
                        </div>

						<div className='w-full flex flex-col'>
							<Input
								htmlFor="title"
								type="text"
								id="title"
                                value={formState[CREATE_WORKSPACE_FORM_FIELDS.TITLE]}
								name={CREATE_WORKSPACE_FORM_FIELDS.TITLE}
								onChange={handleChangeInput}
							/>
						</div>
						<div className='w-full flex flex-col gap-2'>
							<Input
								htmlFor="description"
								type="text"
								id="description"
                                value={formState[CREATE_WORKSPACE_FORM_FIELDS.DESCRIPTION]}
								name={CREATE_WORKSPACE_FORM_FIELDS.DESCRIPTION}
								onChange={handleChangeInput}
							/>
						</div>
						
						<CreateButton
							type="submit"
							text="Crear espacio"
							isLoading={loading}
							ariaLabel="Boton para crear un espacio de trabajo"
							className="w-full mt-4"
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