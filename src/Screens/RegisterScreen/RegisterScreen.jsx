import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import useForm from '../../hooks/useForm'
import useRequest from '../../hooks/useRequest'
import { register } from '../../services/authService'
import Input from '../../Components/Input'
import RegisterButton from '../../Components/RegisterButton'

const RegisterScreen = () => {
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

    /* 
    Implementar el useForm para este formulario de registro
    */
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
            //Si la respuesta es correcta
            if (response && response.ok) {
                alert("Te has registrado exitosamente, te enviamos un mail con instrucciones")
                //Guardo el token en mi contexto
                navigate('/login')
            }
        },
        [response]
    )
    return (
        <div className='w-full h-screen bg-indigo-500 p-6 flex items-center justify-center'>
            <div className='w-full flex flex-col bg-white rounded-xl shadow-xl p-6 md:flex-row md:max-w-4xl md:gap-8'>
                <div className='flex flex-col gap-2 md:w-1/2'>
                    <div className='w-full flex items-center gap-2'>
                        <img className='w-8' src="slack-logo.png" alt="Logo de Slack" />
                        <h1 className='text-2xl font-semibold '>Bienvenidos a Slack</h1>
                    </div>
                    <img className='w-[90%] mx-auto md:w-full' src="register.png" alt="Ilustracion de registro" />
                </div>
                <div className='w-full flex flex-col md:w-1/2'>
                    <h1 className='text-2xl font-semibold mb-4'>
                        Registrarse
                    </h1>
                    <form className='w-full flex flex-col gap-4 mb-10' onSubmit={onSubmit}>
                        <div className='w-full flex flex-col'>
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
                        <div className='w-full flex flex-col gap-2'>
                            <Input
                                htmlFor="password"
                                type="password"
                                id="password"
                                name={REGISTER_FORM_FIELDS.PASSWORD}
                                onChange={handleChangeInput}
                                value={formState[REGISTER_FORM_FIELDS.PASSWORD]}

                            />
                        </div>
                        <RegisterButton
                            type="submit"
                            text="Registrarse"
                            disabled={loading}
                            ariaLabel="Boton para registrarse"
                            className="mt-10 bg-blue-400 text-white px-8 py-2 rounded-full cursor-pointer"
                        />
                    </form>
                    <span className='text-xs text-slate-600 inline-flex items-center gap-2'>Ya tienes una cuenta? <Link className='font-bold' to="/login">Iniciar sesion</Link></span>
                </div>
            </div>

        </div>
    )
}

export default RegisterScreen