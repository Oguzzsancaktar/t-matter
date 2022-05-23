import colors from '@/constants/colors'
import styled from 'styled-components'

export const ModalHeader = styled.div`
  border-bottom: 1px solid ${colors.cyan.primary};
  padding: 1rem;
  height: 85px;
  width: 100%;
`

export const ModalBody = styled.div`
  height: fit-content;
  width: 100%;
`

export const ModalFooter = styled.div`
  width: 100%;
  height: 60px;
`
