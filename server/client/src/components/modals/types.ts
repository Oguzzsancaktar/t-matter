import colors from '@/constants/colors'
import styled from 'styled-components'

export const ModalHeader = styled.div`
  border-bottom: 1px solid ${colors.cyan.primary};
  padding: 1rem;
  /* height: 85px; */
  width: 100%;
  background-color: ${colors.black.light};
`

export const ModalBody = styled.div<{ withModalFooter?: boolean; minHeight?: string }>`
  height: calc(${({ withModalFooter }) => (withModalFooter ? '100% - 85px - 60px' : '100% - 85px')});
  min-height: calc(${({ minHeight }) => minHeight && minHeight});

  width: 100%;
  padding: 1rem 1rem;
`

export const ModalFooter = styled.div`
  width: 100%;
  height: 60px;
  padding: 1rem;
`
