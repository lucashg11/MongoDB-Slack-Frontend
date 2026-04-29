import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import useForm from '../../hooks/useForm'
import useRequest from '../../hooks/useRequest'
import { register } from '../../services/authService'
import Input from '../../Components/Input'
import RegisterButton from '../../Components/RegisterButton'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'

const RegisterScreen = () => {
	const [showPassword, setShowPassword] = useState(false)

	const {
		sendRequest,
		response,
		error,
		loading
	} = useRequest()

	const REGISTER_FORM_FIELDS = {
		EMAIL: 'email',
		PASSWORD: 'password',
		NAME: 'name'
	}

	const initialFormState = {
		[REGISTER_FORM_FIELDS.NAME]: '',
		[REGISTER_FORM_FIELDS.EMAIL]: '',
		[REGISTER_FORM_FIELDS.PASSWORD]: ''
	}
	function onRegister(formState) {
		try {
			sendRequest(
				{
					requestCb: async () => {
						return await register(
							{
								email: formState[REGISTER_FORM_FIELDS.EMAIL],
								password: formState[REGISTER_FORM_FIELDS.PASSWORD],
								name: formState[REGISTER_FORM_FIELDS.NAME]
							}
						)
					}
				}
			)
		}
		catch (error) {
			console.log(error)
		}
	}
	const {
		handleChangeInput,
		onSubmit,
		formState
	} =
		useForm({
			initialFormState,
			submitFn: onRegister
		})
	const navigate = useNavigate()
	useEffect(
		() => {
			if (response && response.ok) {
				navigate('/login')
			}
		},
		[response]
	)
	return (
		<div className='w-full min-h-screen bg-indigo-500 p-4 sm:p-6 flex items-center justify-center'>
			<div className='w-full flex flex-col bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:flex-row md:max-w-4xl md:gap-12'>
				<div className='flex flex-col gap-6 md:w-1/2 md:mb-0 mb-8'>
					<div className='w-full flex items-center gap-3 justify-center md:justify-start'>
						<img className='w-10 h-10 transition-transform duration-300 hover:scale-110' src="slack-logo.png" alt="Logo de Slack" />
						<h1 className='text-3xl font-semibold'>Bienvenidos a Slack</h1>
					</div>
					<img className='w-[90%] mx-auto md:w-full transition-opacity duration-300' src="register.png" alt="Ilustracion de registro" />
				</div>
				<div className='w-full flex flex-col md:w-1/2'>
					<h1 className='text-3xl font-semibold mb-6'>
						Registrarse
					</h1>
					<form className='w-full flex flex-col gap-6 mb-8' onSubmit={onSubmit}>
						<div className='w-full flex flex-col gap-2'>
							<Input
								htmlFor="name"
								type="text"
								id="name"
								name={REGISTER_FORM_FIELDS.NAME}
								onChange={handleChangeInput}
							/>
						</div>
						<div className='w-full flex flex-col gap-2'>
							<Input
								htmlFor="email"
								type="email"
								id="email"
								name={REGISTER_FORM_FIELDS.EMAIL}
								onChange={handleChangeInput}
							/>
						</div>
						<div className='w-full flex flex-col gap-2 relative'>
							<Input
								htmlFor="password"
								type={showPassword ? "text" : "password"}
								id="password"
								name={REGISTER_FORM_FIELDS.PASSWORD}
								onChange={handleChangeInput}
								value={formState[REGISTER_FORM_FIELDS.PASSWORD]}
							/>
							<button
								type="button"
								className="absolute right-2 top-9 text-slate-500 hover:text-slate-700 transition-colors duration-200"
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
						<RegisterButton
							type="submit"
							text="Registrarse"
							isLoading={loading}
							ariaLabel="Boton para registrarse"
							className="w-full"
						/>
						{error && <span className='text-red-500 text-sm font-semibold text-center transition-all duration-300'>{error?.message || 'Ocurrió un error al registrarse'}</span>}
						{response && !response.ok && <span className='text-red-500 text-sm font-semibold text-center transition-all duration-300'>{response.message || 'Error al registrar usuario'}</span>}
						{response && response.ok && <span className='text-green-500 text-sm font-semibold text-center transition-all duration-300'>Te has registrado exitosamente, te enviamos un mail con instrucciones.</span>}
					</form>
					<span className='text-sm text-slate-600 inline-flex items-center gap-2'>Ya tienes una cuenta? <Link className='font-bold text-indigo-500 hover:text-indigo-600 transition-colors duration-200' to="/login">Iniciar sesion</Link></span>
				</div>
			</div>

		</div>
	)
}

export default RegisterScreen