import React from 'react'
import useRequest from '../hooks/useRequest'
import useForm from '../hooks/useForm'
import { inviteMember } from '../services/workspaceService'
import Input from './Input'
import CreateButton from './CreateButton'

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

	// Cerrar modal y limpiar formulario cuando se invita exitosamente
	React.useEffect(() => {
		if (response && response.ok) {
			resetForm()
			if (onMemberInvited) {
				onMemberInvited()
			}
			onClose()
		}
	}, [response, resetForm, onClose, onMemberInvited])

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-300">
			<div className="bg-white relative rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95 duration-300">
				<div className="flex items-center justify-between mb-8">
					<div>
						<h2 className="text-2xl font-bold text-slate-900">
							Invitar a un miembro
						</h2>
						<p className="text-slate-500 text-sm mt-1">
							Envía una invitación por correo electrónico
						</p>
					</div>
					<button
						onClick={onClose}
						className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
						aria-label="Cerrar"
					>
						<span className="text-2xl leading-none">×</span>
					</button>
				</div>

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
							className="w-full px-4 py-3 border-b-2 border-slate-200 bg-slate-50 outline-none focus:border-indigo-500 transition-all duration-300 rounded-t-lg appearance-none cursor-pointer"
						>
							<option value="user">Usuario (Solo lectura/escritura)</option>
							<option value="admin">Administrador (Gestión de canales y miembros)</option>
						</select>
					</div>

					{error && (
						<div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm animate-in shake-x duration-500">
							<p className="font-bold flex items-center gap-2">
								<span>⚠</span> Error
							</p>
							<p>{error?.message || 'No se pudo enviar la invitación'}</p>
						</div>
					)}

					{response && !response.ok && (
						<div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm animate-in shake-x duration-500">
							<p className="font-bold flex items-center gap-2">
								<span>⚠</span> Error
							</p>
							<p>{response?.message || 'Error al procesar la invitación'}</p>
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

					<div className="flex gap-4 mt-4">
						<button
							type="button"
							onClick={onClose}
							disabled={loading}
							className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all duration-200 disabled:opacity-50"
						>
							Cancelar
						</button>
						<CreateButton
							type="submit"
							text={loading ? 'Enviando...' : 'Enviar invitación'}
							disabled={loading || !formState[INVITE_MEMBER_FIELDS.EMAIL].trim()}
							className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-indigo-200 transition-all duration-200 active:scale-95"
						/>
					</div>
				</form>
			</div>
		</div>
	)
}

export default InviteMemberModal
