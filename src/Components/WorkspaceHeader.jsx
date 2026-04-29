import React, { useContext } from 'react'
import { WorkspaceContext } from '../Context/WorkspaceContext'
import useCurrentMember from '../hooks/useCurrentMember'
import { HiUserPlus, HiBars3 } from 'react-icons/hi2'
import { useOutletContext } from 'react-router'
import Button from './Button'

const WorkspaceHeader = ({ onOpenInviteModal }) => {
	const { workspace, members } = useContext(WorkspaceContext)
	const { canInvite } = useCurrentMember()
	const { setIsSidebarOpen } = useOutletContext() || {}

	return (
		<div className="workspace-header bg-white border-b border-slate-200 px-4 sm:px-6 py-4 shadow-sm">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
					<div className="flex items-center gap-3 flex-1">
						<Button
							variant="secondary"
							size="sm"
							onClick={() => setIsSidebarOpen?.(true)}
							className="md:hidden p-2 shadow-none"
							ariaLabel="Abrir menú"
						>
							<HiBars3 className="w-6 h-6 stroke-2" />
						</Button>
						<div className="min-w-0">
							<h1 className="text-lg md:text-2xl font-extrabold text-slate-900 tracking-tight truncate">
								{workspace?.title}
							</h1>
							{workspace?.description && (
								<p className="text-[10px] md:text-xs text-slate-500 truncate max-w-md">
									{workspace.description}
								</p>
							)}
						</div>
					</div>


				</div>

				<div className="flex items-center justify-between w-full md:w-auto gap-3">
					<div className='flex md:flex-row-reverse items-center gap-2'>
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
					{canInvite && (
						<Button
							onClick={onOpenInviteModal}
							size="sm"
							className="px-4"
							ariaLabel="Invitar a Workspace"
						>
							<HiUserPlus className="w-6 h-6" />
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}

export default WorkspaceHeader
