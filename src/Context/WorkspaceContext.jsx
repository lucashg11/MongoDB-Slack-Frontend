import { createContext, useState, useEffect, useCallback } from "react";
import {
	getWorkspaceById,
	getChannelsByWorkspace,
	getMessagesByChannel
} from "../services/workspaceService.js";

export const WorkspaceContext = createContext({
	workspace: null,
	members: [],
	channels: [],
	selectedChannel: null,
	messages: [],
	channelMembers: [],
	workspaceLoading: false,
	channelLoading: false,
	selectChannel: (_channel) => { },
	refreshWorkspace: () => { },
	refreshMessages: () => { }
})

function WorkspaceContextProvider({ workspace_id, children }) {
	const [workspace, setWorkspace] = useState(null)
	const [members, setMembers] = useState([])
	const [channels, setChannels] = useState([])
	const [selectedChannel, setSelectedChannel] = useState(null)
	const [messages, setMessages] = useState([])
	const [channelMembers, setChannelMembers] = useState([])
	const [workspaceLoading, setWorkspaceLoading] = useState(false)
	const [channelLoading, setChannelLoading] = useState(false)

	// Contador para forzar re-fetch sin cambiar otras deps
	const [workspaceKey, setWorkspaceKey] = useState(0)
	const [messagesKey, setMessagesKey] = useState(0)

	// ── Fetch workspace + channels en paralelo ──────────────────────────
	useEffect(() => {
		if (!workspace_id) return
		let cancelled = false

		setWorkspaceLoading(true)

		Promise.all([
			getWorkspaceById(workspace_id),
			getChannelsByWorkspace(workspace_id)
		])
			.then(([wsRes, channelsRes]) => {
				if (cancelled) return
				if (wsRes?.data?.workspace) setWorkspace(wsRes.data.workspace)
				if (wsRes?.data?.members)   setMembers(wsRes.data.members)
				if (channelsRes?.data?.channels) setChannels(channelsRes.data.channels)
			})
			.catch((e) => console.error('[WorkspaceContext] Error cargando workspace:', e))
			.finally(() => { if (!cancelled) setWorkspaceLoading(false) })

		return () => { cancelled = true }
	}, [workspace_id, workspaceKey])

	// ── Fetch mensajes al cambiar de canal ─────────────────────────────
	useEffect(() => {
		if (!workspace_id || !selectedChannel?._id) {
			setMessages([])
			setChannelMembers([])
			return
		}
		let cancelled = false

		setChannelLoading(true)

		getMessagesByChannel(workspace_id, selectedChannel._id)
			.then((res) => {
				if (cancelled) return
				if (res?.data?.messages) setMessages(res.data.messages)
				if (res?.data?.members)  setChannelMembers(res.data.members)
			})
			.catch((e) => console.error('[WorkspaceContext] Error cargando mensajes:', e))
			.finally(() => { if (!cancelled) setChannelLoading(false) })

		return () => { cancelled = true }
	}, [workspace_id, selectedChannel?._id, messagesKey])

	// ── Acciones semánticas públicas ───────────────────────────────────
	const selectChannel = useCallback((channel) => {
		setSelectedChannel(channel)
	}, [])

	const refreshWorkspace = useCallback(() => {
		setWorkspaceKey((k) => k + 1)
	}, [])

	const refreshMessages = useCallback(() => {
		setMessagesKey((k) => k + 1)
	}, [])

	const providerValues = {
		workspace,
		members,
		channels,
		selectedChannel,
		messages,
		channelMembers,
		workspaceLoading,
		channelLoading,
		selectChannel,
		refreshWorkspace,
		refreshMessages
	}

	return (
		<WorkspaceContext.Provider value={providerValues}>
			{children}
		</WorkspaceContext.Provider>
	)
}

export default WorkspaceContextProvider
