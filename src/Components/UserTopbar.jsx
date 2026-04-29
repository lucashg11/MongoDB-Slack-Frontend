import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Link, useLocation } from 'react-router'
import { HiOutlineUser, HiOutlineLogout, HiOutlineChevronDown, HiOutlineChevronLeft } from 'react-icons/hi'
import ProfileModal from './ProfileModal'

const UserTopbar = () => {
    const { user, logout } = useContext(AuthContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
    const location = useLocation()

    const isWorkspace = location.pathname.includes('/workspace/') && !location.pathname.includes('/workspace/new')

    return (
        <header className="h-16 bg-indigo-900 text-white flex items-center justify-between px-4 sm:px-6 shadow-md z-50">
            <div className="flex items-center gap-2 sm:gap-4">
                {isWorkspace && (
                    <Link
                        to="/home"
                        className="flex items-center justify-center p-2 rounded-lg bg-indigo-800 text-indigo-100 hover:bg-indigo-700 hover:text-white transition-all active:scale-95 shadow-sm mr-2"
                        title="Volver a mis workspaces"
                    >
                        <HiOutlineChevronLeft className="w-5 h-5 stroke-2" />
                    </Link>
                )}

                <Link to="/home" className="flex items-center gap-2 group">
                    <img src="/slack-logo.png" alt="Slack" className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" />
                    <span className="font-extrabold text-lg sm:text-xl sm:inline-block tracking-tight">Slack</span>
                </Link>
            </div>

            <div className="relative">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center gap-2 hover:bg-indigo-800 p-1.5 rounded-lg transition-all"
                >
                    <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center font-bold text-sm border border-indigo-400 overflow-hidden">
                        {user?.profile_picture ? (
                            <img src={user.profile_picture} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                            user?.name?.charAt(0).toUpperCase() || 'U'
                        )}
                    </div>
                    <div className="hidden sm:flex flex-col items-start leading-none">
                        <span className="text-sm font-semibold">{user?.name || 'Usuario'}</span>
                        <span className="text-[10px] text-indigo-300">En línea</span>
                    </div>
                    <HiOutlineChevronDown className={`w-4 h-4 text-indigo-300 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMenuOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-10"
                            onClick={() => setIsMenuOpen(false)}
                        ></div>
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 z-20 border border-slate-200 animate-in fade-in zoom-in duration-200 origin-top-right">
                            <div className="px-4 py-3 border-b border-slate-100 mb-2">
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Mi Cuenta</p>
                                <p className="text-[12px] font-bold text-slate-900 truncate">{user?.email}</p>
                            </div>

                            <button 
                                onClick={() => {
                                    setIsProfileModalOpen(true)
                                    setIsMenuOpen(false)
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium"
                            >
                                <HiOutlineUser className="w-5 h-5 text-slate-400" />
                                Ver Perfil
                            </button>

                            <div className="h-px bg-slate-100 my-2"></div>

                            <button
                                onClick={logout}
                                className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
                            >
                                <HiOutlineLogout className="w-5 h-5" />
                                Cerrar Sesión
                            </button>
                        </div>
                    </>
                )}
            </div>

            <ProfileModal 
                isOpen={isProfileModalOpen} 
                onClose={() => setIsProfileModalOpen(false)} 
            />
        </header>
    )
}

export default UserTopbar
