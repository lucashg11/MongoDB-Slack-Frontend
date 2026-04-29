import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getMe } from "../services/userService";

export const AuthContext = createContext(
	{
		isLogged: false,
		user: null,
		manageLogin: (auth_token_slack) => { },
		logout: () => { },
		updateUser: (userData, token) => { }
	}
)

export const LOCALSTORAGE_TOKEN_KEY = 'auth_token_slack'

function AuthContextProvider({ children }) {

	const navigate = useNavigate()
	const [isLogged, setIsLogged] = useState(
		Boolean(
			localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
		)
	)

	const [user, setUser] = useState(null)

	useEffect(() => {
		const token = localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
		if (token) {
			try {
				const base64Url = token.split('.')[1]
				const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
				const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
					return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
				}).join(''))

				const decodedUser = JSON.parse(jsonPayload)
				setUser(decodedUser)
				setIsLogged(true)

				getMe().then(response => {
					if (response.ok) {
						setUser(prev => ({ ...prev, ...response.data.user }))
					}
				})
			} catch (e) {
				console.error("Error decoding token", e)
				localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY)
				setIsLogged(false)
				setUser(null)
			}
		}
	}, [isLogged])

	function manageLogin(auth_token_slack) {
		localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, auth_token_slack)
		setIsLogged(true)
		navigate('/home')
	}

	function logout() {
		localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY)
		setIsLogged(false)
		setUser(null)
		navigate('/login')
	}

	function updateUser(userData, token) {
		if (token) {
			localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token)
		}
		setUser(prev => ({ ...prev, ...userData }))
	}

	const providerValues = {
		isLogged,
		user,
		manageLogin,
		logout,
		updateUser
	}
	return (
		<AuthContext.Provider value={providerValues}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider