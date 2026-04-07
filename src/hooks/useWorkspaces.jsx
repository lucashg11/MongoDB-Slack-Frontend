import { useEffect } from "react"
import useRequest from "./useRequest"
import { getWorkspace } from "../services/workspaceService.js"

function useWorkspaces() {
	const { response, error, loading, sendRequest } = useRequest()

	useEffect(
		() => {
			sendRequest(
				{
					requestCb: getWorkspace
				}
			)
		}, [])


	return {
		response,
		error,
		loading,
		workspaces: response?.data?.workspaces
	}
}

export default useWorkspaces