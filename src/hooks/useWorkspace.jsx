import { useEffect } from "react"
import useRequest from "./useRequest"
import { getWorkspaceById, getChannelsByWorkspace } from "../services/workspaceService.js"

function useWorkspace(workspace_id) {
	const { response, error, loading, sendRequest } = useRequest()
	const { response: channelsResponse, error: channelsError, loading: channelsLoading, sendRequest: sendChannelsRequest } = useRequest()

	useEffect(
		() => {
			if (workspace_id) {
				sendRequest(
					{
						requestCb: () => getWorkspaceById(workspace_id)
					}
				)
				sendChannelsRequest(
					{
						requestCb: () => getChannelsByWorkspace(workspace_id)
					}
				)
			}
		}, [workspace_id])


	const refreshWorkspace = () => {
		if (workspace_id) {
			sendRequest({
				requestCb: () => getWorkspaceById(workspace_id)
			})
			sendChannelsRequest({
				requestCb: () => getChannelsByWorkspace(workspace_id)
			})
		}
	}

	return {
		workspace: response?.data?.workspace,
		members: response?.data?.members,
		channels: channelsResponse?.data?.channels,
		loading: loading || channelsLoading,
		error: error || channelsError,
		refreshWorkspace
	}
}

export default useWorkspace
