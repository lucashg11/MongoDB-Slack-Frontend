import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Link, useLocation } from 'react-router'
import { HiOutlineUser, HiOutlineLogout, HiOutlineChevronDown, HiArrowSmLeft } from 'react-icons/hi'
import { HiBars3 } from 'react-icons/hi2'

const UserTopbar = ({ toggleSidebar }) => {
    const { user, logout } = useContext(AuthContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

    const isWorkspace = location.pathname.includes('/workspace/') && !location.pathname.includes('/workspace/new')

    return (
        <header className="h-16 bg-indigo-900 text-white flex items-center justify-between px-4 sm:px-6 shadow-md z-50">
            <div className="flex items-center gap-4">
                {isWorkspace && (
                    <button
                        onClick={toggleSidebar}
                        className="md:hidden p-2 hover:bg-indigo-800 rounded-lg transition-colors"
                    >
                        <HiBars3 className="w-6 h-6" />
                    </button>
                )}

                <Link to="/home" className="flex items-center gap-2 group">
                    <img src="/slack-logo.png" alt="Slack" className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    <span className="font-bold text-xl hidden sm:inline-block tracking-tight">Slack</span>
                </Link>

                {isWorkspace && (
                    <Link
                        to="/home"
                        className="ml-4 flex items-center gap-2 text-indigo-200 hover:text-white transition-colors text-sm font-medium bg-indigo-800/50 px-3 py-1.5 rounded-full"
                    >
                        <HiArrowSmLeft className="w-4 h-4" />
                        <span className="hidden md:inline">Mis Workspaces</span>
                    </Link>
                )}
            </div>

            <div className="relative">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center gap-2 hover:bg-indigo-800 p-1.5 rounded-lg transition-all"
                >
                    <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center font-bold text-sm border border-indigo-400">
                        {user?.user_name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="hidden sm:flex flex-col items-start leading-none">
                        <span className="text-sm font-semibold">{user?.user_name || 'Usuario'}</span>
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
                                <p className="text-sm font-bold text-slate-900 truncate">{user?.user_email}</p>
                            </div>

                            <button className="w-full flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium">
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
        </header>
    )
}

export default UserTopbar
