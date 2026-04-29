import React, { useContext, useEffect, useMemo, useState } from 'react'
import useRequest from '../hooks/useRequest'
import { inviteToChannel } from '../services/workspaceService'
import { WorkspaceContext } from '../Context/WorkspaceContext'
import CreateButton from './CreateButton'
import BaseModal from './BaseModal'
import Button from './Button'

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

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title="Invitar al canal"
            subtitle={`Añade miembros a #${channel?.name}`}
            maxHeight="max-h-[80vh]"
        >
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                    {availableMembers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <p className="text-slate-500 font-medium">
                                No hay más miembros para invitar.
                            </p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-slate-50">
                            {availableMembers.map((member) => (
                                <li key={member.member_id} className="py-4 flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm border border-indigo-100/50 overflow-hidden ${!member.user_img ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-200'}`}>
                                            {member.user_img ? (
                                                <img src={member.user_img} alt={member.user_name} className="w-full h-full object-cover" />
                                            ) : (
                                                member.user_name ? member.user_name.charAt(0).toUpperCase() : '?'
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{member.user_name}</p>
                                            <p className="text-xs text-slate-500 font-medium">{member.user_email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleInvite(member.member_id)}
                                        disabled={inviteLoading && invitedId === member.member_id}
                                        className="text-xs font-bold text-indigo-600 hover:text-white hover:bg-indigo-600 px-4 py-2 rounded-lg transition-all disabled:opacity-50 border border-indigo-100 hover:border-indigo-600 active:scale-95"
                                    >
                                        {inviteLoading && invitedId === member.member_id ? 'Invitando...' : 'Invitar'}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {inviteError && (
                    <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 animate-in shake-x duration-500">
                        <p className="font-bold flex items-center gap-2">
                            <span>⚠</span> Error
                        </p>
                        <p>{inviteError.message || 'Error al invitar al miembro'}</p>
                    </div>
                )}

                <div className="flex gap-4">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        className="flex-1"
                    >
                        Cerrar
                    </Button>
                </div>
            </div>
        </BaseModal>
    )
}

export default InviteToChannelModal
