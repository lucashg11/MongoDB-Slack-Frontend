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

export async function getWorkspaceById(workspace_id) {
	const res_http = await fetch(ENVIRONMENT.API_URL + `/api/workspace/${workspace_id}`, {
		method: "GET",
		headers: {
			'Authorization': "Bearer " + localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
		}
	})

	const res_json = await res_http.json()
	return res_json
}

export async function getChannelsByWorkspace(workspace_id) {
	const res_http = await fetch(ENVIRONMENT.API_URL + `/api/workspace/${workspace_id}/channels`, {
		method: "GET",
		headers: {
			'Authorization': "Bearer " + localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
		}
	})

	const res_json = await res_http.json()
	return res_json
}

export async function createChannel(workspace_id, channel) {
	const res_http = await fetch(ENVIRONMENT.API_URL + `/api/workspace/${workspace_id}/channels`, {
		method: "POST",
		headers: {
			'Authorization': "Bearer " + localStorage.getItem(LOCALSTORAGE_TOKEN_KEY),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(channel)
	})

	const res_json = await res_http.json()
	return res_json
}

export async function deleteChannel(workspace_id, channel_id) {
	const res_http = await fetch(ENVIRONMENT.API_URL + `/api/workspace/${workspace_id}/channels/${channel_id}`, {
		method: "DELETE",
		headers: {
			'Authorization': "Bearer " + localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
		}
	})

	const res_json = await res_http.json()
	return res_json
}

export async function getMessagesByChannel(workspace_id, channel_id) {
	const url = ENVIRONMENT.API_URL + `/api/workspace/${workspace_id}/channels/${channel_id}/message`

	try {
		const res_http = await fetch(url, {
			method: "GET",
			headers: {
				'Authorization': "Bearer " + localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
			}
		})

		const res_json = await res_http.json()
		return res_json
	} catch (error) {
		console.error('[API] Error fetching messages:', error)
		throw error
	}
}

export async function inviteMember(workspace_id, email, role) {
	const res_http = await fetch(ENVIRONMENT.API_URL + `/api/workspace/${workspace_id}/member/invite`, {
		method: "POST",
		headers: {
			'Authorization': "Bearer " + localStorage.getItem(LOCALSTORAGE_TOKEN_KEY),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, role })
	})

	const res_json = await res_http.json()
	return res_json
}

export async function createMessage(workspace_id, channel_id, message) {
	const url = ENVIRONMENT.API_URL + `/api/workspace/${workspace_id}/channels/${channel_id}/message`

	try {
		const res_http = await fetch(url, {
			method: "POST",
			headers: {
				'Authorization': "Bearer " + localStorage.getItem(LOCALSTORAGE_TOKEN_KEY),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(message)
		})

		const res_json = await res_http.json()
		return res_json
	} catch (error) {
		console.error('[API] Error creating message:', error)
		throw error
	}
}

export async function inviteToChannel(workspace_id, channel_id, member_id) {
	const res_http = await fetch(ENVIRONMENT.API_URL + `/api/workspace/${workspace_id}/channels/${channel_id}/invite`, {
		method: "POST",
		headers: {
			'Authorization': "Bearer " + localStorage.getItem(LOCALSTORAGE_TOKEN_KEY),
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ member_id })
	})

	const res_json = await res_http.json()
	return res_json
}

export async function getWorkspaceMembers(workspace_id) {
	const res_http = await fetch(ENVIRONMENT.API_URL + `/api/workspace/${workspace_id}/member`, {
		method: "GET",
		headers: {
			'Authorization': "Bearer " + localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
		}
	})

	const res_json = await res_http.json()
	return res_json
}