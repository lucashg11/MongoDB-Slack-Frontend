import React, { useContext } from 'react'
import { useOutletContext } from 'react-router'
import { MdAddCircle } from 'react-icons/md'
import { WorkspaceContext } from '../Context/WorkspaceContext'
import useCurrentMember from '../hooks/useCurrentMember'
import { HiCheckCircle, HiUserPlus } from 'react-icons/hi2'

const ChannelsList = ({ onOpenModal, onOpenInviteToChannelModal }) => {
	const { channels, selectedChannel, selectChannel } = useContext(WorkspaceContext)
	const { currentMember, isAdmin, isOwner } = useCurrentMember()
	const { setIsSidebarOpen } = useOutletContext() || {}

	const isWorkspaceAdmin = isAdmin || isOwner

	const filteredChannels = channels?.filter((channel) => {
		if (isWorkspaceAdmin) return true
		return channel.members?.some((m) => {
			const memberId = m.member_id?._id || m.member_id
			return String(memberId) === String(currentMember?.member_id) && m.status === 'accepted'
		})
	}) ?? []

	const AVATAR_COLORS = [
		'bg-indigo-500',
		'bg-emerald-500',
		'bg-amber-500',
		'bg-rose-500',
		'bg-sky-500',
		'bg-violet-500',
		'bg-fuchsia-500',
	]

	const getColorForId = (id) => {
		if (!id) return AVATAR_COLORS[0]
		const idString = String(id)
		let hash = 0
		for (let i = 0; i < idString.length; i++) {
			hash = idString.charCodeAt(i) + ((hash << 5) - hash)
		}
		const index = Math.abs(hash) % AVATAR_COLORS.length
		return AVATAR_COLORS[index]
	}

	return (
		<div className="bg-slate-50 border-r border-slate-200 overflow-hidden flex flex-col h-full w-full sm:w-64 md:w-80 transition-all duration-300">
			<div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5">
				<div className="flex items-center justify-between mb-5 sm:mb-6 md:mb-6 gap-2">
					<h2 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 flex items-center gap-2 truncate">
						<span className="w-8 h-8 sm:w-6 sm:h-6 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xs sm:text-sm font-bold shrink-0">
							#
						</span>
						<span className="text-base md:text-lg truncate">Canales</span>
					</h2>
				</div>

				{filteredChannels.length > 0 ? (
					<div className="space-y-3 sm:space-y-4">
						{filteredChannels.map((channel) => {
							const isSelected = selectedChannel?._id === channel._id
							const membersCount = channel.members?.length || 0
							const acceptedMembers = channel.members?.filter(m => m.status === 'accepted') || []
							const displayedMembers = acceptedMembers.slice(0, 5)
							const remainingCount = membersCount > 5 ? membersCount - 5 : 0

							return (
								<div
									key={channel._id}
									onClick={() => {
										selectChannel(channel)
										if (setIsSidebarOpen) setIsSidebarOpen(false)
									}}
									className={`cursor-pointer p-4 rounded-2xl transition-all duration-300 border group ${isSelected
										? 'bg-white border-indigo-200 shadow-indigo-100 shadow-xl scale-[1.02] ring-1 ring-indigo-100'
										: 'bg-white border-slate-100 hover:border-indigo-100 hover:shadow-lg shadow-sm hover:scale-[1.01]'
										}`}
								>
									<div className="flex flex-col gap-3">
										<div className="flex items-start justify-between gap-2">
											<div className="min-w-0">
												<h3 className={`font-bold text-base md:text-lg transition-colors truncate ${isSelected ? 'text-indigo-600' : 'text-slate-800'
													}`}>
													# {channel.name}
												</h3>
												{channel.description && (
													<p className="text-xs text-slate-500 mt-1 line-clamp-1">
														{channel.description}
													</p>
												)}
											</div>
											{isWorkspaceAdmin && (
												<button
													onClick={(e) => {
														e.stopPropagation()
														onOpenInviteToChannelModal(channel)
													}}
													className={`p-2 rounded-xl transition-all shadow-sm ${isSelected
														? 'bg-indigo-600 text-white hover:bg-indigo-700'
														: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
														}`}
													title="Invitar al canal"
												>
													<HiUserPlus className="text-lg" />
												</button>
											)}
										</div>

										<div className="flex items-center justify-between mt-1">
											<div className="flex items-center">
												{/* Avatar stack */}
												<div className="flex -space-x-2 mr-3">
													{displayedMembers.map((member, index) => {
														const userId = member.member_id?._id || member.member_id
														const userName = member.member_id?.fk_id_user?.name || 'U'
														return (
															<div
																key={userId + index}
																className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm transition-transform group-hover:translate-x-1 ${getColorForId(userId)}`}
																title={userName}
																style={{ zIndex: 10 - index }}
															>
																{userName.charAt(0).toUpperCase()}
															</div>
														)
													})}
													{remainingCount > 0 && (
														<div
															className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 shadow-sm"
															style={{ zIndex: 0 }}
														>
															+{remainingCount}
														</div>
													)}
												</div>

												<span className="text-xs font-medium text-slate-500">
													{membersCount} {membersCount === 1 ? 'miembro' : 'miembros'}
												</span>
											</div>

											{channel.members?.some((m) => {
												const memberId = m.member_id?._id || m.member_id
												return String(memberId) === String(currentMember?.member_id) && m.status === 'accepted'
											}) && (
													<div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">
														<HiCheckCircle className="text-xs" />
														<span>Miembro</span>
													</div>
												)}
										</div>
									</div>
								</div>
							)
						})}
					</div>
				) : (
					<div className="flex items-center justify-center py-16 flex-1">
						<p className="text-slate-500 text-center text-xs sm:text-sm">No hay canales en este workspace</p>
					</div>
				)}
			</div>

			{isWorkspaceAdmin && (
				<div className="p-4 border-t border-slate-200 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
					<button
						onClick={onOpenModal}
						className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
					>
						<MdAddCircle className="text-xl" />
						<span>Crear Nuevo Canal</span>
					</button>
				</div>
			)}
		</div>
	)
}

export default ChannelsList