import React from 'react'
import { CircleColor, Column, H1, ItemContainer, JustifyBetweenRow, Label } from '@components/index'
import Select, { StylesConfig } from 'react-select'
import { IOption } from '@/models'
import colors from '@/constants/colors'
import { selectIconWithText } from '@/utils/selectIconWithText'

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
  menuPlacement?: 'auto' | 'top' | 'bottom'
  placeHolder?: string
  customStyles?: StylesConfig
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
  options,
  menuPlacement,
  placeHolder,
  customStyles = {}
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

      <Select
        placeholder={placeHolder ? placeHolder : 'Select an option'}
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
        styles={customStyles}
        value={selectedValues?.length === 1 ? selectedValues[0] : selectedValues}
        menuPlacement={menuPlacement ? menuPlacement : 'auto'}
        formatOptionLabel={data => (
          <ItemContainer>
            <JustifyBetweenRow>
              <H1 width="calc(100% - 20px)" color={colors.text.primary}>
                {data.label}
              </H1>
              <ItemContainer width="20px">
                {data.color ? (
                  <CircleColor color={data.color?.color} />
                ) : (
                  data.icon && selectIconWithText(data.icon, '20px')
                )}
              </ItemContainer>
            </JustifyBetweenRow>
          </ItemContainer>
        )}
      />
    </Column>
  )
}

export default SelectInput
