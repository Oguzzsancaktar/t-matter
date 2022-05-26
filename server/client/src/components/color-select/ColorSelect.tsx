import colors, { colorOptions } from '@/constants/colors'
import { IComponentProps } from '@/models'
import React from 'react'
import styled from 'styled-components'
import { Column, JustifyBetweenRow } from '../layout'
import { H1, Label } from '../texts'
import CircleColor from './CircleColor'

interface IProps extends IComponentProps {
  value: string
  labelText?: string
  validationError?: boolean
  onClick: (color: string) => void
}

const ColorSelectContainer = styled(JustifyBetweenRow)<Pick<IProps, 'validationError'>>`
  height: 35px;
  border-radius: 0.3rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid ${({ validationError }) => (validationError ? colors.red.primary : colors.gray.dark)};
`

const ColorSelect: React.FC<IProps> = ({ margin, labelText, onClick, value, validationError }) => {
  return (
    <Column margin={margin}>
      {labelText && <H1 margin=" 0 0 0.5rem 0">{labelText}</H1>}
      <ColorSelectContainer validationError={validationError}>
        {colorOptions.map((color, index) => (
          <CircleColor onClick={() => onClick(color)} isSelected={color === value} key={index} color={color} />
        ))}
      </ColorSelectContainer>
    </Column>
  )
}

export default ColorSelect
