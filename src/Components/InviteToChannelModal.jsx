import React, { useContext, useEffect, useMemo, useState } from 'react'
import useRequest from '../hooks/useRequest'
import { inviteToChannel } from '../services/workspaceService'
import { WorkspaceContext } from '../Context/WorkspaceContext'
import CreateButton from './CreateButton'

const InviteToChannelModal = ({ workspace_id, channel, isOpen, onClose, onMemberInvited }) => {
    const { members } = useContext(WorkspaceContext)
    const { sendRequest, response: inviteResponse, error: inviteError, loading: inviteLoading } = useRequest()
    const [invitedId, setInvitedId] = useState(null)

    // Filtra los miembros del workspace que aún no están en el canal
    const availableMembers = useMemo(() => {
        if (!members || !channel?.members) return members ?? []

        const channelMemberIds = new Set(
            channel.members.map((m) => String(m.member_id?._id || m.member_id)).filter(Boolean)
        )

        return members.filter((m) => {
            const memberId = m.member_id ? String(m.member_id) : null
            return memberId && !channelMemberIds.has(memberId)
        })
    }, [members, channel?.members])

    const handleInvite = (member_id) => {
        setInvitedId(member_id)
        sendRequest({
            requestCb: () => inviteToChannel(workspace_id, channel._id, member_id)
        })
    }

    useEffect(() => {
        if (inviteResponse?.ok) {
            setInvitedId(null)
            if (onMemberInvited) onMemberInvited()
            onClose()
        }
    }, [inviteResponse, onMemberInvited, onClose])

    // Limpiar estado al cerrar
    useEffect(() => {
        if (!isOpen) setInvitedId(null)
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white relative rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95 duration-300 flex flex-col max-h-[80vh]">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            Invitar al canal
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">
                            Añade miembros a #{channel?.name}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
                    >
                        <span className="text-2xl leading-none">×</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                    {availableMembers.length === 0 ? (
                        <p className="text-center text-slate-500 py-8">
                            No hay más miembros para invitar.
                        </p>
                    ) : (
                        <ul className="divide-y divide-slate-100">
                            {availableMembers.map((member) => (
                                <li key={member.member_id} className="py-3 flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                                            {member.user_name ? member.user_name.charAt(0).toUpperCase() : '?'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">{member.user_name}</p>
                                            <p className="text-xs text-slate-500">{member.user_email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleInvite(member.member_id)}
                                        disabled={inviteLoading && invitedId === member.member_id}
                                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-3 py-2 rounded-lg transition-all disabled:opacity-50"
                                    >
                                        {inviteLoading && invitedId === member.member_id ? 'Invitando...' : 'Invitar'}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {inviteError && (
                    <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm mb-4">
                        <p>{inviteError.message || 'Error al invitar al miembro'}</p>
                    </div>
                )}

                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InviteToChannelModal
