import React from 'react'
import { Outlet, useOutletContext } from 'react-router'
import WorkspaceContextProvider from '../Context/WorkspaceContext'

const WorkspaceMiddleware = () => {
    const context = useOutletContext()
    return (
        <WorkspaceContextProvider>
            <Outlet context={context} />
        </WorkspaceContextProvider>
    )
}

export default WorkspaceMiddleware
