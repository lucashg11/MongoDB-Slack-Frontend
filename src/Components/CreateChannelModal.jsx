import React, { useState } from 'react'
import useRequest from '../hooks/useRequest'
import useForm from '../hooks/useForm'
import { createChannel } from '../services/workspaceService'
import Input from './Input'
import CreateButton from './CreateButton'
import BaseModal from './BaseModal'
import Button from './Button'

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

	React.useEffect(() => {
		if (response && response.ok) {
			resetForm()
			if (onChannelCreated) {
				onChannelCreated()
			}
			onClose()
		}
	}, [response, resetForm, onChannelCreated, onClose])

	return (
		<BaseModal
			isOpen={isOpen}
			onClose={onClose}
			title="Crear nuevo canal"
			subtitle="Los canales son donde tu equipo se comunica"
		>
			<form onSubmit={onSubmit} className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<label htmlFor="channel-name" className="uppercase text-xs font-bold text-slate-500 tracking-wider">
						Nombre del canal
					</label>
					<Input
						id="channel-name"
						type="text"
						name={CREATE_CHANNEL_FIELDS.NAME}
						placeholder="ej. proyectos-2024"
						onChange={handleChangeInput}
						value={formState[CREATE_CHANNEL_FIELDS.NAME]}
						required
					/>
					<p className="text-xs text-slate-400 italic">
						El nombre será mostrado como #nombre_canal
					</p>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="channel-desc" className="uppercase text-xs font-bold text-slate-500 tracking-wider">
						Descripción (Opcional)
					</label>
					<textarea
						id="channel-desc"
						name={CREATE_CHANNEL_FIELDS.DESCRIPTION}
						value={formState[CREATE_CHANNEL_FIELDS.DESCRIPTION]}
						onChange={handleChangeInput}
						placeholder="¿De qué trata este canal?"
						className="w-full px-4 py-3 border-2 border-slate-100 bg-slate-50 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 resize-none min-h-25"
					/>
				</div>

				{(error || (response && !response.ok)) && (
					<div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm animate-in shake-x duration-500">
						<p className="font-bold flex items-center gap-2">
							<span>⚠</span> Error
						</p>
						<p>{error?.message || response?.payload?.detail || response?.message || 'Error al crear el canal'}</p>
					</div>
				)}

				<div className="flex gap-4 pt-2">
					<Button
						variant="secondary"
						onClick={onClose}
						disabled={loading}
						className="flex-1"
					>
						Cancelar
					</Button>
					<CreateButton
						type="submit"
						text="Crear canal"
						isLoading={loading}
						disabled={!formState[CREATE_CHANNEL_FIELDS.NAME].trim()}
						className="flex-1"
					/>
				</div>
			</form>
		</BaseModal>
	)
}

export default CreateChannelModal
