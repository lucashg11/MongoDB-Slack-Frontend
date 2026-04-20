import { useEffect, useContext } from "react"
import useWorkspace from "./useWorkspace"
import useChannel from "./useChannel"
import { WorkspaceContext } from "../Context/WorkspaceContext"

function useWorkspaceData(workspace_id) {
	const workspaceData = useWorkspace(workspace_id)
	const { selectedChannel } = useContext(WorkspaceContext)
	const channelData = useChannel(workspace_id, selectedChannel?._id)

	const {
		setWorkspace,
		setChannels,
		setMessages,
		setWorkspaceMembers,
		setChannelMembers,
		setWorkspaceLoading,
		setChannelLoading
	} = useContext(WorkspaceContext)

	// Actualizar workspace, canales y miembros cuando se carguen
	useEffect(() => {
		if (workspaceData.workspace) {
			setWorkspace(workspaceData.workspace)
			setWorkspaceMembers(workspaceData.members || [])
		}
	}, [workspaceData.workspace, workspaceData.members, setWorkspace, setWorkspaceMembers])

	useEffect(() => {
		if (workspaceData.channels) {
			setChannels(workspaceData.channels)
		}
	}, [workspaceData.channels, setChannels])

	// Actualizar datos del canal seleccionado
	useEffect(() => {
		if (channelData.messages) {
			setMessages(channelData.messages)
		}
	}, [channelData.messages, setMessages])

	useEffect(() => {
		if (channelData.channelMembers) {
			setChannelMembers(channelData.channelMembers)
		}
	}, [channelData.channelMembers, setChannelMembers])

	// Sincronizar loading states al contexto
	useEffect(() => {
		setWorkspaceLoading(workspaceData.loading)
		setChannelLoading(channelData.loading)
	}, [workspaceData.loading, channelData.loading, setWorkspaceLoading, setChannelLoading])

	return {
		loading: workspaceData.loading,
		refreshMessages: channelData.refreshMessages,
		refreshWorkspace: workspaceData.refreshWorkspace
	}
}

export default useWorkspaceData
