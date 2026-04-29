import React, { useState, useEffect, useContext } from 'react'
import BaseModal from './BaseModal'
import Button from './Button'
import Input from './Input'
import useForm from '../hooks/useForm'
import { updateWorkspace } from '../services/workspaceService'
import uploadFile from '../services/file.service'
import { WorkspaceContext } from '../Context/WorkspaceContext'
import { HiOutlinePhoto, HiPencilSquare } from 'react-icons/hi2'

const EditWorkspaceModal = ({ isOpen, onClose, workspace, onWorkspaceUpdated }) => {
    const { refreshWorkspace } = useContext(WorkspaceContext)
    const [isLoading, setIsLoading] = useState(false)
    const [imagePreview, setImagePreview] = useState(workspace?.url_image || '')
    const [error, setError] = useState('')

    const { formState, handleChangeInput, setFormState } = useForm({
        initialFormState: {
            title: workspace?.title || '',
            description: workspace?.description || '',
            image: null
        }
    })

    useEffect(() => {
        if (workspace) {
            setFormState({
                title: workspace.title || '',
                description: workspace.description || '',
                image: null
            })
            setImagePreview(workspace.url_image || '')
        }
    }, [workspace, setFormState])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            handleChangeInput(e)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            let url_image = workspace.url_image

            if (formState.image) {
                const uploadRes = await uploadFile(formState.image.name, formState.image)
                if (uploadRes.ok) {
                    url_image = uploadRes.data.url
                } else {
                    throw new Error(uploadRes.message || 'Error al subir la imagen')
                }
            }

            const updateRes = await updateWorkspace(workspace._id, {
                title: formState.title,
                description: formState.description,
                url_image
            })

            if (updateRes.ok) {
                if (onWorkspaceUpdated) onWorkspaceUpdated()
                onClose()
            } else {
                throw new Error(updateRes.message || 'Error al actualizar el espacio de trabajo')
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title="Editar Espacio de Trabajo"
            subtitle="Modifica los detalles de tu espacio de trabajo."
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                        {error}
                    </div>
                )}

                <div className="flex flex-col items-center gap-4">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden transition-all group-hover:border-indigo-400">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <HiOutlinePhoto className="w-10 h-10 text-slate-400" />
                            )}
                        </div>
                        <label className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 text-white rounded-lg cursor-pointer shadow-lg hover:bg-indigo-700 transition-colors">
                            <HiPencilSquare className="w-5 h-5" />
                            <input
                                type="file"
                                name="image"
                                className="hidden"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </label>
                    </div>
                    <p className="text-xs text-slate-500">Haz clic para cambiar la imagen</p>
                </div>

                <div className="space-y-4">
                    <Input
                        label="Título del Workspace"
                        placeholder="Ej. Equipo de Desarrollo"
                        name="title"
                        value={formState.title}
                        onChange={handleChangeInput}
                        required
                    />

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                            Descripción
                        </label>
                        <textarea
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-700 resize-none h-24"
                            placeholder="Describe de qué trata este espacio..."
                            name="description"
                            value={formState.description}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        className="flex-1"
                        disabled={isLoading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1"
                        isLoading={isLoading}
                    >
                        Guardar Cambios
                    </Button>
                </div>
            </form>
        </BaseModal>
    )
}

export default EditWorkspaceModal
