import React from 'react'
import { Column, Row } from '@components/index'
import Select from 'react-select'
import styled from 'styled-components'
import { IOption } from '@/models'

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
const Label = styled.label`
  width: 100%;
  text-align: start;
  margin-bottom: 0.4rem;
`

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
      {labelText && <Label>{labelText}</Label>}
      <Select
        className={`react-basic-single ${validationError && 'input-validation-error'}`}
        classNamePrefix="select"
        options={options}
        defaultValue={options[selectedOption || 0]}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        name={name}
        isMulti={isMulti}
        onChange={onChange}
      />
    </Column>
  )
}

export default SelectInput
