import React, { useContext, useState } from 'react'
import { WorkspaceContext } from '../../Context/WorkspaceContext.jsx'
import WorkspaceHeader from '../../Components/WorkspaceHeader.jsx'
import ChannelsList from '../../Components/ChannelsList.jsx'
import MessagesList from '../../Components/MessagesList.jsx'
import CreateChannelModal from '../../Components/CreateChannelModal.jsx'
import InviteMemberModal from '../../Components/InviteMemberModal.jsx'
import InviteToChannelModal from '../../Components/InviteToChannelModal.jsx'
import { useParams, useOutletContext } from 'react-router'
import { HiBars3, HiArrowLeft, HiPlus } from 'react-icons/hi2'

const WorkspaceScreen = () => {
    const { workspace_id } = useParams()
    const { workspaceLoading, refreshWorkspace } = useContext(WorkspaceContext)
    const { isSidebarOpen, setIsSidebarOpen } = useOutletContext()
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
    const [isInviteToChannelModalOpen, setIsInviteToChannelModalOpen] = useState(false)
    const [channelToInvite, setChannelToInvite] = useState(null)

    const handleOpenInviteToChannel = (channel) => {
        setChannelToInvite(channel)
        setIsInviteToChannelModalOpen(true)
    }

    if (workspaceLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-indigo-500">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <p className="text-lg text-slate-600">Cargando workspace...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="workspace-screen flex flex-col h-full bg-slate-100 w-full overflow-hidden relative">
            <WorkspaceHeader onOpenInviteModal={() => setIsInviteModalOpen(true)} />

            <div className="flex flex-1 overflow-hidden w-full relative">
                {/* Overlay para móvil */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-slate-900/60 z-40 md:hidden backdrop-blur-md transition-all duration-300 ease-out animate-in fade-in"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <div className={`
                    fixed inset-y-0 left-0 z-50 w-72 md:w-80 bg-white md:bg-slate-50 transform transition-all duration-300 ease-in-out shadow-2xl md:shadow-none
                    md:relative md:translate-x-0 md:flex md:z-auto md:border-r md:border-slate-200/50
                    ${isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 md:opacity-100'}
                `}>
                    <ChannelsList
                        onOpenModal={() => setIsCreateModalOpen(true)}
                        onOpenInviteToChannelModal={handleOpenInviteToChannel}
                    />

                    {/* Botón cerrar sidebar en móvil */}
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="absolute top-2 right-4 p-2 text-slate-500 hover:text-indigo-600 md:hidden bg-slate-100 hover:bg-indigo-50 rounded-full transition-colors"
                        aria-label="Cerrar menú"
                    >
                        <HiArrowLeft className="w-6 h-6" />
                    </button>
                </div>

                {/* Contenido principal */}
                <div className="flex-1 overflow-hidden w-full relative">
                    <MessagesList />
                </div>
            </div>

            <CreateChannelModal
                workspace_id={workspace_id}
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onChannelCreated={refreshWorkspace}
            />

            <InviteMemberModal
                workspace_id={workspace_id}
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                onMemberInvited={refreshWorkspace}
            />

            <InviteToChannelModal
                workspace_id={workspace_id}
                channel={channelToInvite}
                isOpen={isInviteToChannelModalOpen}
                onClose={() => setIsInviteToChannelModalOpen(false)}
                onMemberInvited={refreshWorkspace}
            />
        </div>
    )
}

export default WorkspaceScreen