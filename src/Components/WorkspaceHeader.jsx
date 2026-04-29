import React, { useContext } from 'react'
import { WorkspaceContext } from '../Context/WorkspaceContext'
import useCurrentMember from '../hooks/useCurrentMember'
import { HiUserPlus } from 'react-icons/hi2'

const WorkspaceHeader = ({ onOpenInviteModal }) => {
	const { workspace, members } = useContext(WorkspaceContext)
	const { canInvite } = useCurrentMember()

	return (
		<div className="workspace-header bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
					<div className="flex-1">
						<h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
							{workspace?.title}
						</h1>
						{workspace?.description && (
							<p className="text-xs text-slate-500 truncate max-w-md">
								{workspace.description}
							</p>
						)}
					</div>

					{canInvite && (
						<button
							onClick={onOpenInviteModal}
							className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all w-full md:w-auto"
						>
							<HiUserPlus className="w-4 h-4" />
							<span>Invitar</span>
						</button>
					)}
				</div>

				<div className="flex items-center gap-3">
					<div className="flex -space-x-2 overflow-hidden">
						{members && members.length > 0 ? (
							members
								.filter(member => member.acceptInvitation === 'accepted')
								.slice(0, 5)
								.map((member, index) => (
									<div
										key={member._id || `member-${index}`}
										className="h-8 w-8 rounded-full ring-2 ring-white bg-indigo-500 text-white flex items-center justify-center text-xs font-bold"
										title={member.user_name}
									>
										{member.user_name?.charAt(0).toUpperCase()}
									</div>
								))
						) : null}
						{members && members.filter(m => m.acceptInvitation === 'accepted').length > 5 && (
							<div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-slate-100 text-slate-600 text-[10px] font-bold">
								+{members.filter(m => m.acceptInvitation === 'accepted').length - 5}
							</div>
						)}
					</div>
					<span className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
						{members?.filter(m => m.acceptInvitation === 'accepted').length || 0} Miembros
					</span>
				</div>
			</div>
		</div>
	)
}

export default WorkspaceHeader
