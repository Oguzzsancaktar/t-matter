import colors from '@/constants/colors'
import { emptyQueryParams } from '@/constants/queryParams'
import { IColor, IComponentProps } from '@/models'
import { useGetColorsQuery } from '@/services/settings/company-planning/dynamicVariableService'
import React from 'react'
import { Loader } from 'react-feather'
import styled from 'styled-components'
import { ItemContainer } from '../item-container'
import { Column, JustifyBetweenRow } from '../layout'
import { H1, Label } from '../texts'
import CircleColor from './CircleColor'

interface IProps extends IComponentProps {
  value: IColor | undefined
  labelText?: string
  validationError?: boolean
  onClick: (color: IColor) => void
}

const ColorSelectContainer = styled(JustifyBetweenRow)<Pick<IProps, 'validationError'>>`
  height: 35px;
  border-radius: 0.3rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid ${({ validationError }) => (validationError ? colors.red.primary : colors.gray.disabled)};
`

const ColorSelect: React.FC<IProps> = ({ margin, labelText, onClick, value, validationError }) => {
  const { data: colorList, isLoading: colorListIsLoading } = useGetColorsQuery(emptyQueryParams)

  return (
    <Column margin={margin}>
      {labelText && (
        <ItemContainer margin="0 0 0.4rem 0">
          <Label color={colors.text.primary}>{labelText}</Label>
        </ItemContainer>
      )}
      <ColorSelectContainer validationError={validationError}>
        {colorList && !colorListIsLoading ? (
          colorList.map((color, index) => (
            <CircleColor
              onClick={() => onClick(color)}
              isSelected={color?._id === value?._id}
              key={index}
              color={color.color}
            />
          ))
        ) : (
          <Loader />
        )}
      </ColorSelectContainer>
    </Column>
  )
}

export default ColorSelect
