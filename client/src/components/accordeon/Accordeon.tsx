import colors from '@/constants/colors'
import React, { useState } from 'react'
import styled from 'styled-components'
import { ItemContainer } from '../item-container'
import { Column } from '../layout'

interface IProps {
  head: React.ReactNode
}
const AccordeonHeader = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${colors.secondary.light};
  border-radius: 0.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`
const AccordeonBody = styled.div<{ isAccordeonOpen: boolean }>`
  padding: 0 1rem;
  border-radius: 0.3rem;
  border: 1px solid ${colors.gray.disabled};
  border-top: transparent;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  transition: all 0.4s ease-in-out;
  max-height: ${({ isAccordeonOpen }) => (isAccordeonOpen ? '1000px' : '0px')};
  overflow: hidden;
`

const Accordeon: React.FC<IProps> = ({ children, head }) => {
  const [isAccordeonOpen, setIsAccordeonOpen] = useState(false)

  return (
    <ItemContainer width="100%">
      <Column>
        <AccordeonHeader onClick={setIsAccordeonOpen.bind(this, !isAccordeonOpen)}>{head}</AccordeonHeader>
        <AccordeonBody isAccordeonOpen={isAccordeonOpen}>{children}</AccordeonBody>
      </Column>
    </ItemContainer>
  )
}

export default Accordeon
