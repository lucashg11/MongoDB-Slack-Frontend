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
		handleChangeInput,
		onSubmit,
		formState
	} = useForm({
		initialFormState,
		submitFn: onLogin
	})

	useEffect(
		() => {
			if (response && response.ok) {
				manageLogin(response.data.auth_token)
			}
		},
		[response]
	)


	return (
		<div className='w-full min-h-screen p-4 sm:p-6 bg-indigo-500 flex items-center justify-center'>
			<div className='w-full flex flex-col bg-white p-6 sm:p-8 rounded-2xl shadow-2xl md:flex-row md:max-w-4xl md:gap-12 transition-all duration-300'>
				<div className='w-full flex flex-col gap-8 mb-8 md:mb-0 md:w-1/2'>
					<div className='w-full flex items-center gap-3'>
						<img className='w-10 h-10 transition-transform duration-300 hover:scale-110' src="slack-logo.png" alt="Logo de Slack" />
						<h1 className='text-3xl font-semibold'>Bienvenido a Slack</h1>
					</div>
					<img className='w-[90%] mx-auto md:w-full transition-opacity duration-300' src="login-img.png" alt="Ilustracion de inicio de sesion" />
				</div>
				<div className='w-full flex flex-col md:w-1/2'>
					<h1 className='text-3xl font-semibold mb-6'>
						Iniciar sesion
					</h1>


					<form onSubmit={onSubmit} className='w-full flex flex-col gap-6 mb-8'>
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
								className="absolute right-4 top-4 text-slate-500 hover:text-slate-700 transition-colors duration-200"
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
						{
							(response && !response.ok) && (
								<div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 mb-2 rounded-lg text-sm transition-all duration-300" role="alert">
									<span className="block sm:inline">{response.payload?.detail || response.message || response.error || 'Credenciales incorrectas o problema de inicio de sesión.'}</span>
								</div>
							)
						}
						{
							error && (
								<div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 mb-2 rounded-lg text-sm transition-all duration-300" role="alert">
									<strong className="font-bold">Error: </strong>
									<span className="block sm:inline">{error.message || 'No se pudo conectar al servidor.'}</span>
								</div>
							)
						}

						<LoginButton
							type="submit"
							text="Iniciar sesion"
							isLoading={loading}
							ariaLabel="Boton para iniciar sesion"
							className="w-full"
						/>
					</form>
					<div className='flex flex-col gap-3 text-sm'>
						<span className='text-slate-600 inline-flex items-center gap-2'>No tienes una cuenta? <Link className='font-bold text-indigo-500 hover:text-indigo-600 transition-colors duration-200' to="/register">Registrarse</Link></span>
						<span className='text-slate-600 inline-flex items-center gap-2'>Olvidaste tu contraseña? <Link className='font-bold text-indigo-500 hover:text-indigo-600 transition-colors duration-200' to="/reset-password-request">Restablecer Contraseña</Link></span>
					</div>
				</div>
			</div >
		</div >
	)
}

export default LoginScreen