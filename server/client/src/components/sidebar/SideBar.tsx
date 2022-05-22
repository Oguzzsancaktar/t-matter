import React from 'react'
import { Link } from 'react-router-dom'
import { Row } from '@components/index'

const SideBar = () => {
  return (
    <Row>
      <Link to="/">Home</Link>
      <Link to="/settings">settings</Link>
    </Row>
  )
}

export default SideBar
