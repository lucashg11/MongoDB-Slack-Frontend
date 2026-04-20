import React, { useContext } from 'react'
import { WorkspaceContext } from '../Context/WorkspaceContext'
import useCurrentMember from '../hooks/useCurrentMember'
import { HiUserPlus } from 'react-icons/hi2'

const WorkspaceHeader = ({ onOpenInviteModal }) => {
	const { workspace, workspaceMembers } = useContext(WorkspaceContext)
	const { canInvite } = useCurrentMember()

	return (
		<div className="workspace-header bg-white border-b border-slate-200 p-6 shadow-sm">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
				<div className="flex flex-col md:flex-row md:items-center gap-6 flex-1">
					<div className="flex-1 text-center md:text-left">
						<h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
							{workspace?.title}
						</h1>
						{workspace?.description && (
							<p className="text-lg text-slate-600">
								{workspace.description}
							</p>
						)}
					</div>

					{canInvite && (
						<button
							onClick={onOpenInviteModal}
							className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all w-full md:w-auto"
						>
							<HiUserPlus className="w-5 h-5" />
							<span>Invitar</span>
						</button>
					)}
				</div>

				<div className="members-section">
					<h3 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
						Miembros del Workspace ({workspaceMembers?.filter(m => m.acceptInvitation === 'accepted').length || 0})
					</h3>
					<div className="flex flex-wrap gap-2">
						{workspaceMembers && workspaceMembers.length > 0 ? (
							workspaceMembers
								.filter(member => member.acceptInvitation === 'accepted')
								.map((member, index) => (
								<div
									key={member._id || `member-${index}`}
									className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-2 rounded-full text-sm font-medium"
								>
									<span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
										{member.user_name?.charAt(0).toUpperCase()}
									</span>
									{member.user_name}
								</div>
							))
						) : (
							<p className="text-slate-500 text-sm">No hay miembros</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default WorkspaceHeader
