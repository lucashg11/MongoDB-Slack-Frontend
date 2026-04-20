import { createContext, useState } from "react";

export const WorkspaceContext = createContext({
	workspace: null,
	channels: [],
	selectedChannel: null,
	messages: [],
	workspaceMembers: [],
	channelMembers: [],
	workspaceLoading: false,
	channelLoading: false,
	setSelectedChannel: (channelId) => { },
	setWorkspace: (workspace) => { },
	setChannels: (channels) => { },
	setMessages: (messages) => { },
	setWorkspaceMembers: (members) => { },
	setChannelMembers: (members) => { },
	setWorkspaceLoading: (loading) => { },
	setChannelLoading: (loading) => { }
})

function WorkspaceContextProvider({ children }) {
	const [workspace, setWorkspace] = useState(null)
	const [channels, setChannels] = useState([])
	const [selectedChannel, setSelectedChannel] = useState(null)
	const [messages, setMessages] = useState([])
	const [workspaceMembers, setWorkspaceMembers] = useState([])
	const [channelMembers, setChannelMembers] = useState([])
	const [workspaceLoading, setWorkspaceLoading] = useState(false)
	const [channelLoading, setChannelLoading] = useState(false)

	const providerValues = {
		workspace,
		channels,
		selectedChannel,
		messages,
		workspaceMembers,
		channelMembers,
		workspaceLoading,
		channelLoading,
		setSelectedChannel,
		setWorkspace,
		setChannels,
		setMessages,
		setWorkspaceMembers,
		setChannelMembers,
		setWorkspaceLoading,
		setChannelLoading
	}

	return (
		<WorkspaceContext.Provider value={providerValues}>
			{children}
		</WorkspaceContext.Provider>
	)
}

export default WorkspaceContextProvider
