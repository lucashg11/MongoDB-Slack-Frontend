import React, { useState, useCallback } from "react";

function useRequest() {
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);


	const sendRequest = useCallback(async ({ requestCb }) => {
		try {
			setResponse(null)
			setError(null)
			setLoading(true)
			const response = await requestCb()

			setResponse(response)
		}
		catch (error) {
			setError(error)
		}
		finally {
			setLoading(false)
		}
	}, [])


	return {
		sendRequest,
		response,
		error,
		loading
	}
}

export default useRequest