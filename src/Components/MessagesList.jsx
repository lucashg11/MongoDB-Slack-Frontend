import React, { useContext } from 'react'
import { useParams } from 'react-router'
import { WorkspaceContext } from '../Context/WorkspaceContext'
import MessageInput from './MessageInput'
import useWorkspaceData from '../hooks/useWorkspaceData'
import useScrollToBottom from '../hooks/useScrollToBottom'

const MessagesList = () => {
	const { selectedChannel, messages, channelMembers } = useContext(WorkspaceContext)
	const { workspace_id } = useParams()
	const { refreshMessages } = useWorkspaceData(workspace_id)
	const scrollRef = useScrollToBottom([messages])

	const handleMessageSent = () => {
		refreshMessages()
	}

	if (!selectedChannel) {
		return (
			<div className="messages-container bg-white flex items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
				<div className="text-center">
					<p className="text-lg text-slate-500">
						Selecciona un canal para ver los mensajes
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className="messages-container bg-white flex flex-col h-full w-full overflow-hidden">
			<div className="channel-info bg-white/80 backdrop-blur-md border-b border-slate-100 p-4 md:px-8 md:py-4 sticky top-0 z-10">
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
							<span className="text-indigo-500">#</span>
							{selectedChannel.name}
						</h2>
						<p className="text-sm text-slate-500 truncate max-w-md">
							{selectedChannel.description || 'Sin descripción'}
						</p>
					</div>
					<div className="hidden sm:flex items-center -space-x-2">
						{selectedChannel.members?.slice(0, 5).map((member, i) => {
							const name = member.member_id?.fk_id_user?.name || 'Usuario'
							return (
								<div
									key={member._id || i}
									className="w-8 h-8 rounded-full border-2 border-white bg-indigo-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-transparent hover:ring-indigo-200 transition-all cursor-pointer"
									title={name}
								>
									{name.charAt(0).toUpperCase()}
								</div>
							)
						})}
						{selectedChannel.members?.length > 5 && (
							<div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-slate-600 text-xs font-bold">
								+{selectedChannel.members.length - 5}
							</div>
						)}
					</div>
				</div>
			</div>

			<div
				ref={scrollRef}
				className="messages-scroll flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth"
			>
				{messages && messages.length > 0 ? (
					messages.map((message) => {
						const authorName = message.fk_id_member?.fk_id_user?.name || 'Usuario'
						const initials = authorName.charAt(0).toUpperCase()
						const time = message.created_at ? new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''

						return (
							<div key={message._id} className="flex items-start gap-4 group hover:bg-slate-50/50 p-2 -mx-2 rounded-xl transition-all">
								<div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm shrink-0">
									{initials}
								</div>
								<div className="flex-1 min-w-0">
									<div className="flex items-baseline gap-2 mb-1">
										<span className="font-bold text-slate-900 hover:underline cursor-pointer">
											{authorName}
										</span>
										<span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
											{time}
										</span>
									</div>
									<p className="text-slate-700 leading-relaxed wrap-break-word">
										{message.content}
									</p>
								</div>
							</div>
						)
					})
				) : (
					<div className="flex flex-col items-center justify-center h-full opacity-50">
						<div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
							<span className="text-4xl">💬</span>
						</div>
						<p className="text-slate-500 text-center font-medium">
							¡Es el comienzo de este canal!
						</p>
						<p className="text-slate-400 text-sm text-center">
							Envía un mensaje para empezar la conversación.
						</p>
					</div>
				)}
			</div>

			<MessageInput
				workspace_id={workspace_id}
				channel_id={selectedChannel._id}
				onMessageSent={handleMessageSent}
			/>
		</div>

	)
}

export default MessagesList
