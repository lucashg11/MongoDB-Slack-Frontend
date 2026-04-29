import { useContext, useMemo } from 'react'
import { WorkspaceContext } from '../Context/WorkspaceContext'
import { AuthContext } from '../Context/AuthContext'

const useCurrentMember = () => {
    const { members } = useContext(WorkspaceContext)
    const { user } = useContext(AuthContext)

    const currentMember = useMemo(() => {
        if (!user || !members) return null
        return members.find(m => m.user_id === user.id)
    }, [user, members])

    const role = currentMember?.member_role || null
    const isAdmin = role === 'admin'
    const isOwner = role === 'owner'
    const isUser = role === 'user'
    const canInvite = isOwner || isAdmin
    const canManageChannels = isOwner || isAdmin

    return {
        currentMember,
        role,
        isAdmin,
        isOwner,
        isUser,
        canInvite,
        canManageChannels
    }
}

export default useCurrentMember
