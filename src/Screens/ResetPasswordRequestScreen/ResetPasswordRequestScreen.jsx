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

    function submitResetPasswordRequest() {
        sendRequest(
            {
                requestCb: async () => {
                    return await resetPasswordRequest(
                        {
                            email: formState[FORM_FIELDS.EMAIL]
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
        <div className='w-full h-screen p-6  bg-indigo-500 flex items-center justify-center'>
            <div className='w-full flex flex-col bg-white p-6 rounded-xl shadow-xl md:flex-row md:max-w-4xl md:gap-8'>
                <div className='flex flex-col gap-4 md:w-1/2'>
                    <div className='w-full flex gap-2 items-center justify-center'>
                        <img className='w-8' src="slack-logo.png" alt="Logo de Slack" />
                        <h1 className='text-xl font-semibold'>Restablecer contraseña</h1>
                    </div>
                    <img className='w-2/3 mx-auto md:w-full' src="reset-pass-img.png" alt="Ilustracion de restablecimiento de contraseña" />
                </div>
                <div className='w-full flex flex-col items-center justify-center md:w-1/2'>
                    {
                        response && !loading && !error ?
                            <p>{response.message}</p>
                            :
                            <div className='w-full flex flex-col gap-4'>
                                <p className='text-sm text-center text-slate-600 '>
                                    Se enviara un mail con instrucciones para que puedas restablecer tu contraseña
                                </p>
                                <form className='w-full flex flex-col gap-4' onSubmit={onSubmit}>
                                    <div className='w-full flex flex-col '>
                                        <Input
                                            htmlFor="email"
                                            type="email"
                                            id="email"
                                            name={FORM_FIELDS.EMAIL}
                                            onChange={handleChangeInput}
                                            value={formState[FORM_FIELDS.EMAIL]}
                                        />
                                    </div>
                                    <RegisterButton className="bg-blue-400 text-white px-8 py-2 rounded-full cursor-pointer mt-4" text={loading ? 'Cargando...' : 'Enviar solicitud'} disabled={loading} />
                                </form>
                                <div className='flex flex-col gap-2 mt-4'>
                                    <span className='text-xs text-slate-600 inline-flex items-center '>Recuerdas tu contraseña? <Link className='font-bold' to={'/login'}>Inciar sesion</Link></span>
                                    <span className='text-xs text-slate-600 inline-flex items-center '>No tienes una cuenta? <Link className='font-bold' to="/register">Registrarse</Link></span>
                                </div>
                            </div>

                    }

                </div>
            </div>
        </div>
    )
}

export default ResetPasswordRequestScreen