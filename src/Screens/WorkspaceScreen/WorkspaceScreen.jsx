import React, { useContext, useState } from 'react'
import { useParams } from 'react-router'
import useWorkspaceData from '../../hooks/useWorkspaceData'
import { WorkspaceContext } from '../../Context/WorkspaceContext'
import { AuthContext } from '../../Context/AuthContext'
import WorkspaceHeader from '../../Components/WorkspaceHeader'
import ChannelsList from '../../Components/ChannelsList'
import MessagesList from '../../Components/MessagesList'
import CreateChannelModal from '../../Components/CreateChannelModal'
import InviteMemberModal from '../../Components/InviteMemberModal'
import InviteToChannelModal from '../../Components/InviteToChannelModal'
import useCurrentMember from '../../hooks/useCurrentMember'
import useRequest from '../../hooks/useRequest'
import { getChannelsByWorkspace } from '../../services/workspaceService'
import { HiBars3, HiArrowLeft, HiPlus, HiUserPlus } from 'react-icons/hi2'

const WorkspaceScreen = () => {
    const { workspace_id } = useParams()
    const { loading, error, refreshWorkspace } = useWorkspaceData(workspace_id)
    const { setChannels, workspaceMembers } = useContext(WorkspaceContext)
    const { user } = useContext(AuthContext)
    const { canInvite } = useCurrentMember()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
    const [isInviteToChannelModalOpen, setIsInviteToChannelModalOpen] = useState(false)
    const [channelToInvite, setChannelToInvite] = useState(null)
    const { sendRequest } = useRequest()

    const handleChannelCreated = () => {
        refreshWorkspace()
    }

    const handleMemberInvited = () => {
        refreshWorkspace()
    }

    const handleOpenInviteToChannel = (channel) => {
        setChannelToInvite(channel)
        setIsInviteToChannelModalOpen(true)
    }

    const handleMemberInvitedToChannel = () => {
        refreshWorkspace()
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-indigo-500">
                <div className="bg-white rounded-lg shadow-xl p-8">
                    <p className="text-lg text-slate-600">Cargando workspace...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-indigo-500">
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
                    <p className="text-lg text-red-600 font-semibold mb-2">Error</p>
                    <p className="text-slate-600">{error?.message || 'Error al cargar el workspace'}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="workspace-screen flex flex-col h-screen bg-slate-100 w-full overflow-hidden relative">
            <WorkspaceHeader onOpenInviteModal={() => setIsInviteModalOpen(true)} />

            <div className="flex flex-1 overflow-hidden w-full relative">
                {/* Overlay para móvil */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-slate-900/60 z-40 md:hidden backdrop-blur-md transition-all duration-500 ease-out animate-in fade-in"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Sidebar - Se oculta a la izquierda en móvil y es estático en desktop */}
                <div className={`
                    fixed inset-y-0 left-0 z-50 w-[280px] sm:w-72  md:w-80 bg-white/95 md:bg-slate-50 transform transition-all duration-500 ease-in-out shadow-2xl md:shadow-none backdrop-blur-xl md:backdrop-blur-none
                    md:relative md:translate-x-0 md:flex md:z-auto md:border-r md:border-slate-200/50
                    ${isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 md:opacity-100'}
                `}>
                    <ChannelsList 
                        onOpenModal={() => setIsCreateModalOpen(true)} 
                        onOpenInviteToChannelModal={handleOpenInviteToChannel}
                    />

                    {/* Botón para cerrar sidebar en móvil */}
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

            {/* Botones flotantes para móvil */}
            <div className="md:hidden fixed bottom-8 left-8 right-8 z-40 flex justify-between items-center pointer-events-none">
                {!isSidebarOpen && (
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="pointer-events-auto bg-indigo-600 text-white p-4 rounded-2xl shadow-[0_10px_40px_-10px_rgba(79,70,229,0.5)] hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-3 group border border-indigo-400/30 backdrop-blur-sm"
                    >
                        <div className="bg-white/20 p-1.5 rounded-lg group-hover:bg-white/30 transition-colors">
                            <HiBars3 className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-sm tracking-widest uppercase">
                            Canales
                        </span>
                    </button>
                )}

                <div className="flex gap-4 ml-auto pointer-events-auto">
                    {isSidebarOpen && (
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="bg-indigo-600 text-white p-5 rounded-full shadow-[0_10px_40px_-10px_rgba(79,70,229,0.5)] hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center border border-indigo-400/30 backdrop-blur-sm animate-in zoom-in duration-300"
                            aria-label="Crear nuevo canal"
                        >
                            <HiPlus className="w-8 h-8" />
                        </button>
                    )}
                </div>
            </div>

            <CreateChannelModal
                workspace_id={workspace_id}
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onChannelCreated={handleChannelCreated}
            />

            <InviteMemberModal
                workspace_id={workspace_id}
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                onMemberInvited={handleMemberInvited}
            />

            <InviteToChannelModal
                workspace_id={workspace_id}
                channel={channelToInvite}
                isOpen={isInviteToChannelModalOpen}
                onClose={() => setIsInviteToChannelModalOpen(false)}
                onMemberInvited={handleMemberInvitedToChannel}
            />
        </div>
    )
}

export default WorkspaceScreen

{/*<div className="workspace-screen flex flex-col h-screen bg-slate-100">
            <WorkspaceHeader />
            
            <div className="flex flex-1 overflow-hidden">
                <div className="hidden md:block md:w-80">
                    <ChannelsList />
                </div>
                
                <div className="flex-1 overflow-hidden">
                    <MessagesList />
                </div>
            </div>

            Para móvil: mostrar selector de canales en modal o drawer 
            <div className="md:hidden fixed bottom-4 left-4 z-40">
                <details className="dropdown">
                    <summary className="btn btn-primary">Canales</summary>
                    <div className="dropdown-content bg-white rounded-lg shadow-lg p-4 w-64">
                        <ChannelsList />
                    </div>
                </details>
            </div>
        </div>*/}