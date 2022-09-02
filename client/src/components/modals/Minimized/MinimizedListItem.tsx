import colors from '@/constants/colors'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  children: React.ReactNode
}

const MinimizedModalsBarWrapper = styled.div`
  border-radius: 0.3rem;
  background-color: ${colors.primary.dark};
  position: fixed;
  margin: 0.5rem;
  width: calc(100vw - 80px - 1rem);
  right: 0;
  bottom: 0;
  z-index: 9999;
`

const BarList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.4rem;
`

const MinimizedModalsBar: React.FC<IProps> = ({ children }) => {
  return (
    <MinimizedModalsBarWrapper>
      <BarList>{children}</BarList>
    </MinimizedModalsBarWrapper>
  )
}

export default MinimizedModalsBar
