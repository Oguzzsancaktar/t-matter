import React, { useEffect, useState } from 'react'
import 'flatpickr/dist/themes/material_green.css'
import '@/styles/vendors/flat-picker.css'
import Flatpickr from 'react-flatpickr'
import { Clock } from 'react-feather'
import { Column, Row } from '../layout'
import { Label } from '../texts'
import { Container, IconContainer } from '../input/input-with-icon/styled'
import { ItemContainer } from '../item-container'
import colors from '@/constants/colors'
import moment from 'moment'

interface IProps {
  name: string
  labelText?: string | null
  enableTime?: boolean
  placeholder?: string
  validationError?: boolean
  value?: Date | string | number
  disabled?: boolean
  dateFormat?: string
  minDate?: number
  maxDate?: number
  onChange: (value: Date[], dateText: string) => void
}

export interface IStyledProps {
  validationError?: boolean
  disabled?: boolean
}

const DatePicker: React.FC<IProps> = ({
  name,
  value = '',
  enableTime = false,
  placeholder = 'Select Birthday...',
  disabled,
  labelText,
  validationError,
  dateFormat = 'M/d/Y',
  minDate,
  onChange,
  maxDate
}) => {
  const [date, setDate] = useState(value)

  const handleDateChange = (date: Date[], dateText) => {
    onChange(date, dateText)
  }

  useEffect(() => {
    if (value) {
      setDate(value)
    }
  }, [value])

  return (
    <Column>
      {labelText && (
        <ItemContainer margin="0 0 0.4rem 0">
          <Label color={colors.text.primary}>{labelText}</Label>
        </ItemContainer>
      )}
      <Row>
        <Column>
          <Container validationError={validationError}>
            <Row>
              <IconContainer disabled={disabled} validationError={validationError}>
                <Clock size={20} />
              </IconContainer>
              <Flatpickr
                options={{
                  enableTime: enableTime,
                  dateFormat: dateFormat,
                  minDate: minDate,
                  maxDate: maxDate
                }}
                disabled={disabled}
                value={date}
                onChange={handleDateChange}
                placeholder={placeholder}
              />
            </Row>
          </Container>
        </Column>

        {/* <InputWithIcon
          onChange={e => onChange(e.target.value)}
          name={name}
          type="text"
          value={time}
          onFocus={() => setShowTime(true)}
          // onBlur={() => setShowTime(false)}
        /> */}
      </Row>
    </Column>
  )
}

export default DatePicker
