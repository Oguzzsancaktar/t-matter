import React from 'react'
import { Column, ItemContainer, Label } from '@components/index'
import Select from 'react-select'
import { IOption } from '@/models'
import colors from '@/constants/colors'

interface IProps {
  labelText?: string
  selectedOption?: IOption[] | null
  isDisabled?: boolean
  isLoading?: boolean
  isClearable?: boolean
  isSearchable?: boolean
  isMulti?: boolean
  validationError?: boolean
  onChange: ((event: React.ChangeEvent) => void) | ((option: IOption) => void) | any
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
  const selectedValues = selectedOption?.map(
    op => options?.find(option => option.value === op.value) || (isMulti ? [] : { label: 'Select Option', value: '' })
  )

  return (
    <Column>
      {labelText && (
        <ItemContainer margin="0 0 0.4rem 0">
          <Label color={colors.text.primary}>{labelText}</Label>{' '}
        </ItemContainer>
      )}

      <Select
        placeholder="Select an option"
        className={`react-basic-single ${validationError && 'input-validation-error'}`}
        classNamePrefix="select"
        options={options}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        name={name}
        isMulti={isMulti}
        onChange={onChange}
        defaultValue={selectedValues}
        value={selectedValues?.length === 1 ? selectedValues[0] : selectedValues}
      />
    </Column>
  )
}

export default SelectInput
