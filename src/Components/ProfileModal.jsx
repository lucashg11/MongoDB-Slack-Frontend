import React, { useContext, useState, useRef, useEffect } from 'react'
import BaseModal from './BaseModal'
import Button from './Button'
import Input from './Input'
import { AuthContext } from '../Context/AuthContext'
import { updateProfile, uploadImage } from '../services/userService'
import { HiOutlineCamera } from 'react-icons/hi'

const ProfileModal = ({ isOpen, onClose }) => {
    const { user, updateUser } = useContext(AuthContext)
    const [name, setName] = useState(user?.name || '')
    const [bio, setBio] = useState(user?.profile_bio || '')
    const [profilePicture, setProfilePicture] = useState(user?.profile_picture || '')
    const [isLoading, setIsLoading] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState('')
    const fileInputRef = useRef(null)

    useEffect(() => {
        if (isOpen && user) {
            setName(user.name || '')
            setBio(user.profile_bio || '')
            setProfilePicture(user.profile_picture || '')
        }
    }, [isOpen, user])

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        setIsUploading(true)
        setError('')
        try {
            const response = await uploadImage(file, 'avatars')
            if (response.ok) {
                const newImageUrl = response.data.url
                setProfilePicture(newImageUrl)
                
                const updateResponse = await updateProfile({
                    name,
                    profile_bio: bio,
                    profile_picture: newImageUrl
                })

                if (updateResponse.ok) {
                    updateUser(updateResponse.data.user, updateResponse.data.auth_token)
                } else {
                    setError(updateResponse.message || 'Error al guardar la imagen en el perfil')
                }
            } else {
                setError(response.message || 'Error al subir la imagen')
            }
        } catch (err) {
            setError('Error de conexión al subir la imagen')
        } finally {
            setIsUploading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const response = await updateProfile({
                name,
                profile_bio: bio,
                profile_picture: profilePicture
            })

            if (response.ok) {
                updateUser(response.data.user, response.data.auth_token)
                onClose()
            } else {
                setError(response.message || 'Error al actualizar el perfil')
            }
        } catch (err) {
            setError('Error de conexión al actualizar el perfil')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title="Editar Perfil"
            subtitle="Personaliza cómo te ven los demás en Slack"
            maxWidth="max-w-lg"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-2xl bg-indigo-100 overflow-hidden border-2 border-indigo-200 shadow-inner flex items-center justify-center font-bold text-3xl text-indigo-500">
                            {profilePicture ? (
                                <img src={profilePicture} alt={name} className="w-full h-full object-cover" />
                            ) : (
                                name.charAt(0).toUpperCase()
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-all active:scale-90"
                            disabled={isUploading}
                        >
                            <HiOutlineCamera className="w-5 h-5" />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                        {isUploading && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-2xl">
                                <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium">Recomendado: Cuadrada, 400x400px</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Nombre Completo</label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Tu nombre"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Biografía</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Cuéntanos algo sobre ti..."
                            className="w-full px-4 py-3 text-gray-800 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none resize-none h-24 text-sm"
                        ></textarea>
                    </div>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-xs font-medium rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-1">
                        {error}
                    </div>
                )}

                <div className="flex gap-3 pt-2">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        fullWidth
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        disabled={isUploading}
                        fullWidth
                    >
                        Guardar Cambios
                    </Button>
                </div>
            </form>
        </BaseModal>
    )
}

export default ProfileModal
