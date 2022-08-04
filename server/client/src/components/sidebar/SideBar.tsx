import React from 'react'
import { Link } from 'react-router-dom'
import { ItemContainer, JustifyCenterRow, UserBadge } from '@components/index'
import { useAuth } from '@/hooks/useAuth'

const SideBar = () => {
  const { loggedUser, logout } = useAuth()

  return (
    <JustifyCenterRow width="100wh" padding="1rem">
      <ItemContainer padding="1rem">
        <Link to="/">Home</Link>
      </ItemContainer>
      <ItemContainer padding="1rem">
        <Link to="/settings">settings</Link>
      </ItemContainer>

      <ItemContainer padding="1rem">
        <Link to="/customers">customers</Link>
      </ItemContainer>
      {loggedUser.user && (
        <UserBadge
          userImage={'https://source.unsplash.com/user/c_v_r/100x100'}
          userName={loggedUser.user?.firstname + loggedUser.user?.lastname}
          userEmail={loggedUser.user?.email}
        />
      )}
      <button onClick={logout}>Logout</button>
    </JustifyCenterRow>
  )
}

export default SideBar
