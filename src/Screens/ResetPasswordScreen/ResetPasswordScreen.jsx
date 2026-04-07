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
		<div className='w-full h-screen p-6 bg-indigo-500 flex items-center justify-center'>
			<div className='w-full flex flex-col bg-white p-6 rounded-xl shadow-xl md:flex-row md:max-w-4xl md:gap-8'>
				<div className='flex flex-col gap-4 md:w-1/2'>
					<div className='w-full flex gap-2 items-center justify-center'>
						<img className='w-8' src="/slack-logo.png" alt="Logo de Slack" />
						<h1 className='text-xl font-semibold'>Ingresar nueva contraseña</h1>
					</div>
					<img className='w-2/3 mx-auto md:w-full' src="/reset-pass-img.png" alt="Ilustracion de restablecimiento de contraseña" />
				</div>
				<div className='w-full flex flex-col items-center justify-center md:w-1/2'>
					{
						(response && !response.ok) && (
							<div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm" role="alert">
								<span className="block sm:inline">{response.payload?.detail || response.message || response.error || 'La solicitud no pudo ejecutarse.'}</span>
							</div>
						)
					}
					{
						error && (
							<div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm" role="alert">
								<strong className="font-bold">Error de conexión: </strong>
								<span className="block sm:inline">{error.message || 'No se pudo conectar al servidor.'}</span>
							</div>
						)
					}
					<div className='w-full flex flex-col gap-4'>
						<p className='text-sm text-center text-slate-600 '>
							Ingresa tu nueva contraseña a continuación.
						</p>
						<form className='w-full flex flex-col gap-4' onSubmit={onSubmit}>
							<div className='w-full flex flex-col '>
								<Input
									htmlFor="password"
									type="password"
									id="password"
									name={FORM_FIELDS.PASSWORD}
									onChange={handleChangeInput}
									value={formState[FORM_FIELDS.PASSWORD]}
								/>
							</div>
							<RegisterButton className="bg-blue-400 text-white px-8 py-2 rounded-full cursor-pointer mt-4" text={loading ? 'Cargando...' : 'Restablecer contraseña'} disabled={loading} />
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ResetPasswordScreen