import { IOption } from '@/models'
import React, { Fragment, useCallback, useState } from 'react'
import { MultiParams, Select } from 'react-functional-select'

interface IProps {
  placeholder?: string
  optionList: IOption[]
  handleChange: (selectedOptions: IOption[]) => void
}
const MultiSelectOthers: React.FC<IProps> = ({ placeholder = 'Select Option', optionList, handleChange }) => {
  const [isInvalid, setIsInvalid] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<IOption | null>(null)

  const getOptionValue = useCallback((option: IOption): string => option.value, [])
  const onOptionChange = useCallback((option: IOption | null): void => setSelectedOption(option), [])
  const getOptionLabel = useCallback((option: IOption) => `${option.label}`, [])

  const renderMultiOptions = useCallback(
    ({ selected, renderOptionLabel }: MultiParams) => <Fragment>{<div>{`${selected.length} selected`}</div>}</Fragment>,
    []
  )

  return (
    <Select
      isMulti
      isClearable
      isSearchable
      options={optionList}
      getOptionValue={getOptionValue}
      getOptionLabel={getOptionLabel}
      openMenuOnClick={true}
      placeholder={placeholder}
      // blurInputOnSelect={blurInputOnSelect}
      closeMenuOnSelect={false}
      onOptionChange={handleChange}
      hideSelectedOptions={false}
      renderMultiOptions={renderMultiOptions}
    />
  )
}

export default MultiSelectOthers
