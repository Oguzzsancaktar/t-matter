import React from 'react'
import { Link } from 'react-router-dom'
import { ItemContainer, JustifyCenterRow, Row } from '@components/index'

const SideBar = () => {
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
    </JustifyCenterRow>
  )
}

export default SideBar
