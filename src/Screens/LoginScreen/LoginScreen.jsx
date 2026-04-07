import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router'
import useForm from '../../hooks/useForm'
import { login } from '../../services/authService'
import useRequest from '../../hooks/useRequest'
import { AuthContext } from '../../Context/AuthContext'
import Input from '../../Components/Input.jsx'
import LoginButton from '../../Components/LoginButton.jsx'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const LoginScreen = () => {
	const [showPassword, setShowPassword] = useState(false)

	const {
		sendRequest,
		error,
		response,
		loading
	} = useRequest()

	const LOGIN_FORM_FIELDS = {
		EMAIL: 'email',
		PASSWORD: 'password'
	}

	const initialFormState = {
		[LOGIN_FORM_FIELDS.EMAIL]: '',
		[LOGIN_FORM_FIELDS.PASSWORD]: ''
	}

	const { manageLogin } = useContext(AuthContext)

	function onLogin(formState) {
		sendRequest(
			{
				requestCb: async () => {
					return await login(
						{
							email: formState[LOGIN_FORM_FIELDS.EMAIL],
							password: formState[LOGIN_FORM_FIELDS.PASSWORD]
						}
					)
				}
			}
		)
	}

	const {
		handleChangeInput, //Funcion de cambio del input, debemos asociarlas a cada input
		onSubmit, //Funcion que asociaremos al evento submit del formario
		formState
	} = useForm({ //Usamos useForm cada vez que tengamos que capurar campos de un formulario (Manejo de formularios)
		initialFormState,  //Estado incial del formulario
		submitFn: onLogin //Funcion que se activa al enviar formulario
	})

	/* 
	La funcion se carga cada vez que cambie response
	*/
	useEffect(
		() => {
			//Si la respuesta es correcta
			if (response && response.ok) {
				//Guardo el token en mi contexto
				manageLogin(response.data.auth_token)
			}
		},
		[response]
	)


	return (
		<div className='w-full h-screen p-6  bg-indigo-500 flex items-center justify-center'>
			<div className='w-full flex flex-col bg-white p-6 rounded-xl shadow-xl md:flex-row md:max-w-4xl md:gap-8'>
				<div className='w-full flex flex-col gap-10 mb-10 md:w-1/2'>
					<div className='w-full flex items-center gap-2'>
						<img className='w-8' src="slack-logo.png" alt="Logo de Slack" />
						<h1 className='text-2xl font-semibold'>Bienvenido a Slack</h1>
					</div>
					<img className='w-[90%] mx-auto md:w-full' src="login-img.png" alt="Ilustracion de inicio de sesion" />
				</div>
				<div className='w-full flex flex-col md:w-1/2'>
					<h1 className='text-2xl font-semibold mb-4'>
						Iniciar sesion
					</h1>

					{
						(response && !response.ok) && (
							<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm" role="alert">
								<span className="block sm:inline">{response.payload?.detail || response.message || response.error || 'Credenciales incorrectas o problema de inicio de sesión.'}</span>
							</div>
						)
					}
					{
						error && (
							<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm" role="alert">
								<strong className="font-bold">Error de conexión: </strong>
								<span className="block sm:inline">{error.message || 'No se pudo conectar al servidor.'}</span>
							</div>
						)
					}

					<form onSubmit={onSubmit} className='w-full flex flex-col gap-4 mb-10'>
						<div className='flex flex-col gap-2'>
							<Input
								htmlFor="email"
								type="email"
								id="email"
								name={LOGIN_FORM_FIELDS.EMAIL}
								onChange={handleChangeInput}
							/>
						</div>
						<div className='flex flex-col gap-2 relative'>
							<Input
								htmlFor="password"
								type={showPassword ? "text" : "password"}
								id="password"
								name={LOGIN_FORM_FIELDS.PASSWORD}
								onChange={handleChangeInput}
							/>
							<button
								type="button"
								className="absolute right-0 bottom-1 text-slate-500 hover:text-slate-700"
								onClick={() => setShowPassword(!showPassword)}
								aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
							>
								{showPassword ? (
									<IoMdEyeOff size={24} />
								) : (
									<IoMdEye size={24} />
								)}
							</button>
						</div>
						<LoginButton
							type="submit"
							text="Iniciar sesion"
							ariaLabel="Boton para iniciar sesion"
							className="mt-10 bg-blue-400 text-white px-8 py-2 rounded-full cursor-pointer"
						/>
					</form>
					<span className='text-xs text-slate-600 inline-flex items-center gap-2 mb-4'>No tienes una cuenta? <Link className='font-bold text-indigo-500' to="/register">Registrarse</Link></span>
					<span className='text-xs text-slate-600 inline-flex items-center gap-2'>Olvidaste tu contraseña? <Link className='font-bold text-indigo-500' to="/reset-password-request">Restablecer Contraseña</Link></span>
				</div>
			</div >
		</div >
	)
}

export default LoginScreen