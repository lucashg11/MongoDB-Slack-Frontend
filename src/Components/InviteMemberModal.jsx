import React from 'react'
import useRequest from '../hooks/useRequest'
import useForm from '../hooks/useForm'
import { inviteMember } from '../services/workspaceService'
import Input from './Input'
import CreateButton from './CreateButton'
import BaseModal from './BaseModal'
import Button from './Button'

const InviteMemberModal = ({ workspace_id, isOpen, onClose, onMemberInvited }) => {
	const { sendRequest, response, error, loading } = useRequest()

	const INVITE_MEMBER_FIELDS = {
		EMAIL: 'email',
		ROLE: 'role'
	}

	const initialFormState = {
		[INVITE_MEMBER_FIELDS.EMAIL]: '',
		[INVITE_MEMBER_FIELDS.ROLE]: 'user'
	}

	const onInviteMember = (formState) => {
		sendRequest({
			requestCb: async () => {
				return await inviteMember(workspace_id, formState[INVITE_MEMBER_FIELDS.EMAIL], formState[INVITE_MEMBER_FIELDS.ROLE])
			}
		})
	}

	const { handleChangeInput, onSubmit, resetForm, formState } = useForm({
		initialFormState,
		submitFn: onInviteMember
	})

	React.useEffect(() => {
		if (response && response.ok) {
			resetForm()
			if (onMemberInvited) {
				onMemberInvited()
			}
			onClose()
		}
	}, [response, resetForm, onClose, onMemberInvited])

	return (
		<BaseModal
			isOpen={isOpen}
			onClose={onClose}
			title="Invitar a un miembro"
			subtitle="Envía una invitación por correo electrónico"
		>
			<form onSubmit={onSubmit} className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<label htmlFor="invite-email" className="uppercase text-xs font-bold text-slate-500 tracking-wider">
						Correo electrónico
					</label>
					<Input
						id="invite-email"
						type="email"
						name={INVITE_MEMBER_FIELDS.EMAIL}
						placeholder="ejemplo@correo.com"
						onChange={handleChangeInput}
						value={formState[INVITE_MEMBER_FIELDS.EMAIL]}
						required
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="invite-role" className="uppercase text-xs font-bold text-slate-500 tracking-wider">
						Rol en el espacio de trabajo
					</label>
					<select
						id="invite-role"
						name={INVITE_MEMBER_FIELDS.ROLE}
						value={formState[INVITE_MEMBER_FIELDS.ROLE]}
						onChange={handleChangeInput}
						className="w-full px-4 py-3 border-2 border-slate-100 bg-slate-50 outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 rounded-xl appearance-none cursor-pointer"
					>
						<option value="user">Usuario (Solo lectura/escritura)</option>
						<option value="admin">Administrador (Gestión de canales y miembros)</option>
					</select>
				</div>

				{(error || (response && !response.ok)) && (
					<div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm animate-in shake-x duration-500">
						<p className="font-bold flex items-center gap-2">
							<span>⚠</span> Error
						</p>
						<p>{error?.message || response?.message || 'Error al procesar la invitación'}</p>
					</div>
				)}

				{response && response.ok && (
					<div className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-4 py-3 rounded-xl text-sm animate-in slide-in-from-top-2 duration-300">
						<p className="font-bold flex items-center gap-2">
							<span>✓</span> ¡Éxito!
						</p>
						<p>{response.message || 'Invitación enviada correctamente'}</p>
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
						text="Enviar invitación"
						isLoading={loading}
						disabled={!formState[INVITE_MEMBER_FIELDS.EMAIL].trim()}
						className="flex-1"
					/>
				</div>
			</form>
		</BaseModal>
	)
}

export default InviteMemberModal
