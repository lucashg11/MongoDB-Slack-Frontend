import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

const BaseModal = ({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    maxWidth = 'max-w-md',
    maxHeight = 'max-h-[90vh]'
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    if (!isOpen) return null

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const modalContent = (
        <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-9999 p-4 animate-in fade-in duration-300"
            onClick={handleBackdropClick}
        >
            <div
                className={`bg-white relative rounded-2xl shadow-2xl ${maxWidth} w-full ${maxHeight} animate-in zoom-in-95 duration-300 flex flex-col overflow-hidden`}
            >
                <div className="p-8 pb-0 flex items-start justify-between">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="text-slate-500 text-sm mt-1">
                                {subtitle}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all group"
                        aria-label="Cerrar"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 transition-transform group-hover:rotate-90"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    )

    return createPortal(modalContent, document.body)
}

export default BaseModal
