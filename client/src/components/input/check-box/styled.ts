import colors from '@/constants/colors'
import styled from 'styled-components'
import { IStyledProps } from './types'

export const CheckboxContainer = styled.div`
  display: flex;
  vertical-align: middle;
  cursor: pointer;
  margin-right: 0.4rem;
`

export const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`

export const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

export const StyledCheckbox = styled.div<IStyledProps>`
  display: inline-block;
  width: 1.3rem;
  height: 1.3rem;
  background: ${props => (props.checked ? colors.green.primary : colors.gray.disabled)};
  border-radius: 3px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`
