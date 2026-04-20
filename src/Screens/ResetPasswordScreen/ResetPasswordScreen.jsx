import React, { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import useForm from '../../hooks/useForm'
import useRequest from '../../hooks/useRequest'
import { resetPassword } from '../../services/authService'
import Input from '../../Components/Input'
import RegisterButton from '../../Components/RegisterButton'

const ResetPasswordScreen = () => {
	const { reset_password_token } = useParams()
	const navigate = useNavigate()

	const {
		sendRequest,
		response,
		error,
		loading
	} = useRequest()

	const FORM_FIELDS = {
		PASSWORD: 'password'
	}

	const initialFormState = {
		[FORM_FIELDS.PASSWORD]: ''
	}

	function submitResetPassword() {
		sendRequest(
			{
				requestCb: async () => {
					return await resetPassword(
						{
							password: formState[FORM_FIELDS.PASSWORD],
							reset_password_token: reset_password_token
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
		initialFormState: initialFormState,
		submitFn: submitResetPassword
	})

	useEffect(() => {
		if (response && response.ok) {
			navigate('/login')
		}
	}, [response, navigate])

	return (
		<div className='w-full min-h-screen p-4 sm:p-6 bg-indigo-500 flex items-center justify-center'>
			<div className='w-full flex flex-col bg-white p-6 sm:p-8 rounded-2xl shadow-2xl md:flex-row md:max-w-4xl md:gap-12'>
				<div className='flex flex-col gap-6 md:w-1/2 md:mb-0 mb-8'>
					<div className='w-full flex gap-3 items-center justify-center md:justify-start'>
						<img className='w-10 h-10 transition-transform duration-300 hover:scale-110' src="/slack-logo.png" alt="Logo de Slack" />
						<h1 className='text-2xl font-semibold'>Ingresar nueva contrasena</h1>
					</div>
					<img className='w-2/3 mx-auto md:w-full transition-opacity duration-300' src="/reset-pass-img.png" alt="Ilustracion de restablecimiento de contrasena" />
				</div>
				<div className='w-full flex flex-col items-center justify-center md:w-1/2'>
					{
						(response && !response.ok) && (
							<div className="w-full bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-lg mb-6 text-sm transition-all duration-300" role="alert">
								<span className="block sm:inline">{response.payload?.detail || response.message || response.error || 'La solicitud no pudo ejecutarse.'}</span>
							</div>
						)
					}
					{
						error && (
							<div className="w-full bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-lg mb-6 text-sm transition-all duration-300" role="alert">
								<strong className="font-bold">Error: </strong>
								<span className="block sm:inline">{error.message || 'No se pudo conectar al servidor.'}</span>
							</div>
						)
					}
					<div className='w-full flex flex-col gap-5'>
						<p className='text-sm text-center text-slate-600'>
							Ingresa tu nueva contraseña a continuación.
						</p>
						<form className='w-full flex flex-col gap-6' onSubmit={onSubmit}>
							<div className='w-full flex flex-col'>
								<Input
									htmlFor="password"
									type="password"
									id="password"
									name={FORM_FIELDS.PASSWORD}
									onChange={handleChangeInput}
									value={formState[FORM_FIELDS.PASSWORD]}
								/>
							</div>
							<RegisterButton 
								className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg active:scale-95 disabled:opacity-50" 
								text={loading ? 'Cargando...' : 'Restablecer contraseña'} 
								disabled={loading} 
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ResetPasswordScreen