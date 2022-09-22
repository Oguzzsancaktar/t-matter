import React from 'react'
import { Column, ItemContainer, Label } from '@components/index'
import { IOption } from '@/models'
import colors from '@/constants/colors'
import Multiselect from 'multiselect-react-dropdown'

interface IProps {
  labelText?: string
  selectedOption?: IOption[] | null
  isDisabled?: boolean
  isLoading?: boolean
  isClearable?: boolean
  isSearchable?: boolean
  isMulti?: boolean
  validationError?: boolean
  onChange?: ((event: React.ChangeEvent) => void) | ((option: IOption) => void) | any
  name?: string
  options?: any[]
  menuPlacement?: 'auto' | 'top' | 'bottom'
  placeHolder?: string
}

const SelectDopdown: React.FC<IProps> = ({
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
  options,
  menuPlacement,
  placeHolder
}) => {
  const selectedValues = selectedOption?.map(
    op =>
      options?.find(option => option.value === op.value) ||
      (isMulti ? [] : { label: placeHolder ? placeHolder : 'Select Option', value: '' })
  )

  return (
    <Column>
      {labelText && (
        <ItemContainer margin="0 0 0.4rem 0">
          <Label color={colors.text.primary}>{labelText}</Label>
        </ItemContainer>
      )}

      <Multiselect
        displayValue="label"
        onRemove={function noRefCheck() {}}
        onSearch={function noRefCheck() {}}
        onSelect={function noRefCheck() {}}
        options={options}
        showCheckbox
      />
    </Column>
  )
}

export default SelectDopdown
