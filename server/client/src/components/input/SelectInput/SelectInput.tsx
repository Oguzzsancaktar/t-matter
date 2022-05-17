import React from 'react'
import { Column, Row } from '@components/index'
import Select from 'react-select'

interface IProps {
  labelText?: string
  selectedOption?: number
  isDisabled?: boolean
  isLoading?: boolean
  isClearable?: boolean
  isSearchable?: boolean
  isMulti?: boolean
  onChange: (event: React.ChangeEvent) => void
  name: string
  options: any[]
}

const SelectInput: React.FC<IProps> = ({
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
      {labelText && <Row>{labelText}</Row>}
      <Select
        className="react-basic-single"
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
