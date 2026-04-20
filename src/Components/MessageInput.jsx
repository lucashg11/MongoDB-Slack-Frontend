import { createMessage } from '../services/workspaceService'
import { useContext, useState } from 'react'
import { WorkspaceContext } from '../Context/WorkspaceContext'
import useCurrentMember from '../hooks/useCurrentMember'
import useRequest from '../hooks/useRequest'
import { HiPaperAirplane, HiLockClosed } from 'react-icons/hi2'

const MessageInput = ({ workspace_id, channel_id, onMessageSent }) => {
	const [content, setContent] = useState('')
	const { sendRequest, loading } = useRequest()
	const { selectedChannel, setChannels, setSelectedChannel } = useContext(WorkspaceContext)
	const { currentMember, isAdmin, isOwner } = useCurrentMember()

	const canInteract = isAdmin || isOwner || selectedChannel?.members?.some(m => (m.member_id?._id || m.member_id) === currentMember?.member_id && m.status === 'accepted')

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!content.trim() || loading) return

		const messageContent = content.trim()
		setContent('')

		try {
			await sendRequest({
				requestCb: () => createMessage(workspace_id, channel_id, { content: messageContent })
			})
			if (onMessageSent) {
				onMessageSent()
			}
		} catch (error) {
			console.error('Error sending message:', error)
			// Restaurar el contenido si falló el envío (opcional)
			setContent(messageContent)
		}
	}

	return (
		<div className="p-4 border-t border-slate-200 bg-white">
			{canInteract ? (
				<form onSubmit={handleSubmit} className="relative flex items-center gap-2">
					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder={`Enviar mensaje a #${selectedChannel?.name}...`}
						rows="1"
						className="flex-1 px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none max-h-32 scrollbar-hide text-slate-800"
						onKeyDown={(e) => {
							if (e.key === 'Enter' && !e.shiftKey) {
								e.preventDefault()
								handleSubmit(e)
							}
						}}
					/>
					<button
						type="submit"
						disabled={!content.trim() || loading}
						className={`p-3 rounded-xl transition-all ${content.trim() && !loading
								? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 active:scale-95'
								: 'bg-slate-200 text-slate-400 cursor-not-allowed'
							}`}
					>
						<HiPaperAirplane className={`w-6 h-6 ${content.trim() && !loading ? 'rotate-0' : 'rotate-45'}`} />
					</button>
				</form>
			) : (
				<div className="flex items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
							<HiLockClosed className="text-xl" />
						</div>
						<div>
							<p className="text-sm font-bold text-slate-900">
								Canal de solo lectura
							</p>
							<p className="text-xs text-slate-500">
								Debes ser invitado a #{selectedChannel?.name} para enviar mensajes.
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default MessageInput
