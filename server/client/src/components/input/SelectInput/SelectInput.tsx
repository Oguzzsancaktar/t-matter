import React from 'react'
import { Column, ItemContainer, Label } from '@components/index'
import Select from 'react-select'
import { IOption } from '@/models'
import colors from '@/constants/colors'

interface IProps {
  labelText?: string
  selectedOption?: number
  isDisabled?: boolean
  isLoading?: boolean
  isClearable?: boolean
  isSearchable?: boolean
  isMulti?: boolean
  validationError?: boolean
  onChange?: ((event: React.ChangeEvent) => void) | ((option: IOption) => void)
  name: string
  options: any[]
}

const SelectInput: React.FC<IProps> = ({
  validationError,
  selectedOption,
  isDisabled,
  isLoading,
  isClearable,
  isSearchable,
  isMulti,
  name,
  labelText,
  onChange,
  options
}) => {
  return (
    <Column>
      {labelText && (
        <ItemContainer margin="0 0 0.4rem 0">
          {' '}
          <Label color={colors.text.primary}>{labelText}</Label>{' '}
        </ItemContainer>
      )}

      <Select
        className={`react-basic-single ${validationError && 'input-validation-error'}`}
        classNamePrefix="select"
        options={options}
        defaultValue={options[selectedOption || 0] || options[0]}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        name={name}
        isMulti={isMulti}
        onChange={onChange}
        value={options[selectedOption || 0] || options[0]}
      />
    </Column>
  )
}

export default SelectInput
