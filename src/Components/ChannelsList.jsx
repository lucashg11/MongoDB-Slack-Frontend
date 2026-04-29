import React, { useContext } from 'react'
import { MdAddCircle } from 'react-icons/md'
import { WorkspaceContext } from '../Context/WorkspaceContext'
import useCurrentMember from '../hooks/useCurrentMember'
import { HiCheckCircle, HiUserPlus } from 'react-icons/hi2'

const ChannelsList = ({ onOpenModal, onOpenInviteToChannelModal }) => {
	const { channels, selectedChannel, selectChannel } = useContext(WorkspaceContext)
	const { currentMember, isAdmin, isOwner } = useCurrentMember()

	const isWorkspaceAdmin = isAdmin || isOwner

	const filteredChannels = channels?.filter((channel) => {
		if (isWorkspaceAdmin) return true
		return channel.members?.some((m) => {
			const memberId = m.member_id?._id || m.member_id
			return String(memberId) === String(currentMember?.member_id) && m.status === 'accepted'
		})
	}) ?? []

	return (
		<div className="bg-slate-50 border-r border-slate-200 overflow-hidden flex flex-col h-full w-full sm:w-64 md:w-80 transition-all duration-300">
			<div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5">
				<div className="flex items-center justify-between mb-5 sm:mb-6 md:mb-6 gap-2">
					<h2 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 flex items-center gap-2 truncate">
						<span className="w-8 h-8 sm:w-6 sm:h-6 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xs sm:text-sm font-bold shrink-0">
							#
						</span>
						<span className="text-lg truncate">Canales</span>
					</h2>
					<button
						onClick={onOpenModal}
						className="hidden md:flex group relative items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-linear-to-br from-indigo-500 to-indigo-600 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 shrink-0"
						title="Crear nuevo canal"
						aria-label="Crear nuevo canal"
					>
						<MdAddCircle className="text-lg sm:text-xl" />
						<span className="absolute top-full mb-2 right-1/2 translate-x-1/2 bg-slate-900/20 text-white text-xs font-medium px-3 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
							Nuevo canal
						</span>
					</button>
				</div>

				{filteredChannels.length > 0 ? (
					<div className="space-y-1 sm:space-y-1.5 md:space-y-2 flex-1">
						{filteredChannels.map((channel) => (
							<div
								key={channel._id}
								onClick={() => selectChannel(channel)}
								className={`cursor-pointer p-3 sm:p-4 rounded-xl transition-all duration-200 group/item ${
									selectedChannel?._id === channel._id
										? 'bg-indigo-600 text-white shadow-lg ring-1 ring-indigo-400'
										: 'bg-white text-slate-900 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 shadow-sm hover:shadow-md'
								}`}
							>
								<div className="flex items-start justify-between gap-2">
									<div className="flex-1 min-w-0">
										<div className="flex items-center justify-between">
											<h3 className="font-bold mb-1 text-md sm:text-sm md:text-base truncate">
												# {channel.name}
											</h3>
											{isWorkspaceAdmin && (
												<button
													onClick={(e) => {
														e.stopPropagation()
														onOpenInviteToChannelModal(channel)
													}}
													className={`p-1.5 rounded-lg transition-all ${
														selectedChannel?._id === channel._id
															? 'hover:bg-indigo-500 text-white'
															: 'hover:bg-indigo-100 text-indigo-600'
													}`}
													title="Invitar al canal"
												>
													<HiUserPlus className="text-lg" />
												</button>
											)}
										</div>
										{channel.description && (
											<p className={`text-xs sm:text-xs md:text-sm mb-2 line-clamp-2 ${
												selectedChannel?._id === channel._id ? 'text-indigo-100' : 'text-slate-600'
											}`}>
												{channel.description}
											</p>
										)}
										<div className="flex items-center gap-2 mt-2">
											<span className={`text-xs font-semibold px-2 py-0.5 sm:py-1 rounded whitespace-nowrap ${
												selectedChannel?._id === channel._id
													? 'bg-indigo-600 text-white'
													: 'bg-slate-200 text-slate-700'
											}`}>
												{channel.members?.length || 0}m
											</span>
											{channel.members?.some((m) => {
												const memberId = m.member_id?._id || m.member_id
												return String(memberId) === String(currentMember?.member_id) && m.status === 'accepted'
											}) && (
												<span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${
													selectedChannel?._id === channel._id ? 'text-indigo-200' : 'text-emerald-600'
												}`}>
													<HiCheckCircle className="text-xs" />
													Miembro
												</span>
											)}
										</div>
									</div>
								</div>

								{channel.members && channel.members.length > 0 && (
									<div className="mt-2 flex flex-wrap gap-1">
										{channel.members.slice(0, 2).map((member) => (
											<span
												key={member._id}
												className={`text-xs px-1.5 sm:px-2 md:px-2 py-0.5 sm:py-1 rounded truncate max-w-15 sm:max-w-20 ${
													selectedChannel?._id === channel._id
														? 'bg-indigo-600 text-white'
														: 'bg-slate-200 text-slate-700'
												}`}
												title={member.member_id?.fk_id_user?.name || 'Usuario'}
											>
												{(member.member_id?.fk_id_user?.name || 'Usuario').split(' ')[0]}
											</span>
										))}
										{channel.members.length > 2 && (
											<span className={`text-xs px-1.5 sm:px-2 md:px-2 py-0.5 sm:py-1 rounded ${
												selectedChannel?._id === channel._id
													? 'bg-indigo-600 text-white'
													: 'bg-slate-200 text-slate-700'
											}`}>
												+{channel.members.length - 2}
											</span>
										)}
									</div>
								)}
							</div>
						))}
					</div>
				) : (
					<div className="flex items-center justify-center py-16 flex-1">
						<p className="text-slate-500 text-center text-xs sm:text-sm">No hay canales en este workspace</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default ChannelsList