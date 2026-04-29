import React, { useState } from 'react'
import { Outlet } from 'react-router'
import UserTopbar from './UserTopbar'

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <div className="flex flex-col h-screen w-full overflow-hidden">
            <UserTopbar toggleSidebar={toggleSidebar} />
            <main className="flex-1 overflow-hidden relative">
                <Outlet context={{ isSidebarOpen, setIsSidebarOpen }} />
            </main>
        </div>
    )
}

export default MainLayout
