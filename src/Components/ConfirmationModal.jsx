import React from 'react'
import BaseModal from './BaseModal'
import Button from './Button'

const ConfirmationModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    description, 
    confirmText = 'Confirmar', 
    cancelText = 'Cancelar',
    isLoading = false,
    variant = 'danger'
}) => {
    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            subtitle={description}
            maxWidth="max-w-md"
        >
            <div className="flex gap-3 mt-2">
                <Button
                    variant="secondary"
                    onClick={onClose}
                    className="flex-1"
                    disabled={isLoading}
                >
                    {cancelText}
                </Button>
                <Button
                    variant={variant === 'danger' ? 'danger' : 'primary'}
                    onClick={onConfirm}
                    className="flex-1"
                    isLoading={isLoading}
                >
                    {confirmText}
                </Button>
            </div>
        </BaseModal>
    )
}

export default ConfirmationModal
