import { createContext, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext(
	{
		isLogged: false,
		manageLogin: (auth_token_slack) => { }
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

	function manageLogin(auth_token_slack) {
		localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, auth_token_slack)
		setIsLogged(true)
		navigate('/home')
	}

	const providerValues = {
		isLogged,
		manageLogin
	}
	return (
		<AuthContext.Provider value={providerValues}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider