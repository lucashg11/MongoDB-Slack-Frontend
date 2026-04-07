import ENVIRONMENT from "../config/env.config.js";
import { LOCALSTORAGE_TOKEN_KEY } from "../Context/AuthContext.jsx";



export async function getWorkspace() {
	const res_http = await fetch(ENVIRONMENT.API_URL + '/api/workspace', {
		method: "GET",
		headers: {
			'Authorization': "Bearer " + localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
		}
	})

	const res_json = await res_http.json()
	return res_json
}

export async function createWorkspace(workspace) {
	const res_http = await fetch(ENVIRONMENT.API_URL + '/api/workspace', {
		method: "POST",
		headers: {
			'Authorization': "Bearer " + localStorage.getItem(LOCALSTORAGE_TOKEN_KEY),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(workspace)
	})
	const res_json = await res_http.json()
	return res_json
}