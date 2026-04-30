import React from 'react'
import { Link } from 'react-router'
import useForm from '../../hooks/useForm'
import useRequest from '../../hooks/useRequest'
import { resetPasswordRequest } from '../../services/authService'
import Input from '../../Components/Input'
import RegisterButton from '../../Components/RegisterButton'

const ResetPasswordRequestScreen = () => {
	const {
		sendRequest,
		response,
		error,
		loading
	} = useRequest()

	const FORM_FIELDS = {
		EMAIL: 'email'
	}

	const initialFormState = {
		[FORM_FIELDS.EMAIL]: ''
	}

	function submitResetPasswordRequest(form_data) {
		sendRequest(
			{
				requestCb: async () => {
					return await resetPasswordRequest(
						{
							email: form_data[FORM_FIELDS.EMAIL]
						}
					)
				}
			}
		)
	}

	const {
		handleChangeInput,
		onSubmit,
		resetForm,
		formState
	} = useForm({
		initialFormState: initialFormState,
		submitFn: submitResetPasswordRequest
	})

	return (
		<div className='w-full min-h-screen p-4 sm:p-6 bg-indigo-500 flex items-center justify-center'>
			<div className='w-full flex flex-col bg-white p-6 sm:p-8 rounded-2xl shadow-2xl md:flex-row md:max-w-4xl md:gap-12'>
				<div className='flex flex-col gap-6 md:w-1/2 md:mb-0 mb-8'>
					<div className='w-full flex gap-3 items-center justify-center md:justify-start'>
						<img className='w-10 h-10 transition-transform duration-300 hover:scale-110' src="slack-logo.png" alt="Logo de Slack" />
						<h1 className='text-2xl font-semibold'>Restablecer contraseña</h1>
					</div>
					<img className='w-2/3 mx-auto md:w-full transition-opacity duration-300' src="reset-pass-img.png" alt="Ilustracion de restablecimiento de contraseña" />
				</div>
				<div className='w-full flex flex-col items-center justify-center md:w-1/2'>
					{
						response && !loading && !error ?
							<p className='text-center text-slate-700'>{response.message}</p>
							:
							<div className='w-full flex flex-col gap-5'>
								<p className='text-sm text-center text-slate-600'>
									Se enviará un mail con instrucciones para que puedas restablecer tu contraseña
								</p>
								<form className='w-full flex flex-col gap-6' onSubmit={onSubmit}>
									<div className='w-full flex flex-col'>
										<Input
											htmlFor="email"
											type="email"
											id="email"
											name={FORM_FIELDS.EMAIL}
											onChange={handleChangeInput}
											value={formState[FORM_FIELDS.EMAIL]}
										/>
									</div>
									<RegisterButton 
										type="submit"
										className="w-full" 
										text="Enviar solicitud" 
										isLoading={loading} 
									/>
								</form>
								<div className='flex flex-col gap-3 mt-2'>
									<span className='text-sm text-slate-600 inline-flex items-center gap-1'>¿Recuerdas tu contraseña? <Link className='font-bold text-indigo-500 hover:text-indigo-600 transition-colors duration-200' to={'/login'}>Iniciar sesión</Link></span>
									<span className='text-sm text-slate-600 inline-flex items-center gap-1'>¿No tienes una cuenta? <Link className='font-bold text-indigo-500 hover:text-indigo-600 transition-colors duration-200' to="/register">Registrarse</Link></span>
								</div>
							</div>
					}
				</div>
			</div>
		</div>
	)
}

export default ResetPasswordRequestScreen