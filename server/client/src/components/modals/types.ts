import colors from '@/constants/colors'
import styled from 'styled-components'

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.primary.light};
  height: 63px;
  width: 100%;
  background-color: ${colors.primary.dark};
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
`

export const ModalBody = styled.div<{ withModalFooter?: boolean; minHeight?: string }>`
  /* height: calc(${({ withModalFooter }) => (withModalFooter ? '100% - 85px - 60px' : '100% - 85px')}); */
  min-height: calc(${({ minHeight }) => minHeight && minHeight});
  /* max-height: 850px; */
  /* overflow-y: auto; */
  width: 100%;
  padding: 1rem 1rem;
`

export const ModalFooter = styled.div`
  width: 100%;
  height: 60px;
  padding: 1rem;
`
