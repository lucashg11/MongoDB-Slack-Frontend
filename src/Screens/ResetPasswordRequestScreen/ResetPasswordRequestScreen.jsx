import React from 'react'
import { Link } from 'react-router'
import useForm from '../../hooks/useForm'
import useRequest from '../../hooks/useRequest'
import { resetPasswordRequest } from '../../services/authService'

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
        <div>

            <h1>Restablecer contraseña</h1>

            {
                response && !loading && !error ?
                    <p>{response.message}</p>
                    :
                    <>
                        <p>
                            Se enviara un mail con instrucciones para que puedas restablecer tu contraseña
                        </p>
                        <form onSubmit={onSubmit}>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    name={FORM_FIELDS.EMAIL}
                                    id="email"
                                    onChange={handleChangeInput}
                                    value={formState[FORM_FIELDS.EMAIL]}
                                />
                            </div>
                            <button type='submit' disabled={loading}>{loading ? 'Cargando' : 'Enviar solicitud'}</button>
                        </form>
                        <span>
                            Recuerdas tu contraseña? <Link to={'/login'}>Inciar sesion</Link>
                        </span>
                        <br />
                        <span>No tienes una cuenta? <Link to="/register">Registrarse</Link></span>
                    </>

            }


        </div>
    )
}

export default ResetPasswordRequestScreen