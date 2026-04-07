import { useState } from "react";

function useRequest() {
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);


	async function sendRequest({ requestCb }) {
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
	}


	return {
		sendRequest,
		response,
		error,
		loading
	}
}

export default useRequest