import { useEffect } from "react"
import useRequest from "./useRequest"
import { getMessagesByChannel } from "../services/workspaceService.js"

function useChannel(workspace_id, channel_id) {
	const { response: messagesResponse, error: messagesError, loading: messagesLoading, sendRequest: sendMessagesRequest } = useRequest()

	const fetchMessages = () => {
		if (workspace_id && channel_id) {
			sendMessagesRequest(
				{
					requestCb: () => getMessagesByChannel(workspace_id, channel_id)
				}
			)
		}
	}

	useEffect(fetchMessages, [workspace_id, channel_id])

	return {
		messages: messagesResponse?.data?.messages,
		channelMembers: messagesResponse?.data?.members,
		loading: messagesLoading,
		error: messagesError,
		refreshMessages: fetchMessages
	}
}

export default useChannel
