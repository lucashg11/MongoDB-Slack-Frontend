import React, { useState } from 'react'
import useRequest from '../hooks/useRequest'
import useForm from '../hooks/useForm'
import { createChannel } from '../services/workspaceService'
import Input from './Input'
import CreateButton from './CreateButton'

const CreateChannelModal = ({ workspace_id, isOpen, onClose, onChannelCreated }) => {
	const { sendRequest, response, error, loading } = useRequest()

	const CREATE_CHANNEL_FIELDS = {
		NAME: 'name',
		DESCRIPTION: 'description'
	}

	const initialFormState = {
		[CREATE_CHANNEL_FIELDS.NAME]: '',
		[CREATE_CHANNEL_FIELDS.DESCRIPTION]: ''
	}

	const onCreateChannel = (formState) => {
		try {
			sendRequest({
				requestCb: async () => {
					return await createChannel(workspace_id, {
						name: formState[CREATE_CHANNEL_FIELDS.NAME],
						description: formState[CREATE_CHANNEL_FIELDS.DESCRIPTION]
					})
				}
			})
		} catch (error) {
			console.error('Error creating channel:', error)
		}
	}

	const { handleChangeInput, onSubmit, resetForm, formState } = useForm({
		initialFormState,
		submitFn: onCreateChannel
	})

	// Cerrar modal y limpiar formulario cuando se crea exitosamente
	React.useEffect(() => {
		if (response && response.ok) {
			resetForm()
			if (onChannelCreated) {
				onChannelCreated()
			}
			onClose()
		}
	}, [response, resetForm, onChannelCreated, onClose])

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white relative rounded-lg shadow-2xl max-w-md w-full p-6">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold text-slate-900">
						Crear nuevo canal
					</h2>
					<button
						onClick={onClose}
						className="text-slate-400 hover:text-slate-600 text-2xl "
						aria-label="Cerrar"
					>
						×
					</button>
				</div>

				<form onSubmit={onSubmit} className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<Input
							htmlFor="channel-name"
							type="text"
							name={CREATE_CHANNEL_FIELDS.NAME}
							onChange={handleChangeInput}
							value={formState[CREATE_CHANNEL_FIELDS.NAME]}
						/>
						<p className="text-xs text-slate-500">
							El nombre será mostrado como #nombre_canal
						</p>
					</div>

					<div className="flex flex-col gap-2">
						<label className="uppercase text-sm font-medium text-slate-700 block mb-1">
							Descripción (Opcional)
						</label>
						<textarea
							name={CREATE_CHANNEL_FIELDS.DESCRIPTION}
							value={formState[CREATE_CHANNEL_FIELDS.DESCRIPTION]}
							onChange={handleChangeInput}
							placeholder="¿De qué trata este canal?"
							className="w-full px-3 py-2 border-b-2 border-slate-300 bg-transparent outline-none focus:outline-none focus:border-indigo-500 transition-colors duration-300 resize-none"
							rows="3"
						/>
					</div>

					{error && (
						<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
							<p className="font-semibold">Error</p>
							<p>{error?.message || 'No se pudo crear el canal'}</p>
						</div>
					)}

					{response && !response.ok && (
						<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
							<p className="font-semibold">Error</p>
							<p>{response?.payload?.detail || response?.message || 'Error al crear el canal'}</p>
						</div>
					)}

					<div className="flex gap-3 mt-4">
						<button
							type="button"
							onClick={onClose}
							disabled={loading}
							className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors duration-200 disabled:opacity-50"
						>
							Cancelar
						</button>
						<CreateButton
							type="submit"
							text={loading ? 'Creando...' : 'Crear canal'}
							disabled={loading || !formState[CREATE_CHANNEL_FIELDS.NAME].trim()}
							className="flex-1 bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
						/>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CreateChannelModal
