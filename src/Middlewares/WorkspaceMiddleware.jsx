import React from 'react'
import { Outlet } from 'react-router'
import WorkspaceContextProvider from '../Context/WorkspaceContext'

const WorkspaceMiddleware = () => {
    return (
        <WorkspaceContextProvider>
            <Outlet />
        </WorkspaceContextProvider>
    )
}

export default WorkspaceMiddleware
