import React, { useRef, useState } from 'react'
import 'flatpickr/dist/themes/material_green.css'
import '@/styles/vendors/flat-picker.css'

import Flatpickr from 'react-flatpickr'
import styled from 'styled-components'
import { useOutsideAlerter } from '@/hooks/useOutsideAlerter'
import { Clock, Eye, EyeOff } from 'react-feather'
import { InputWithIcon } from '../input'
import { Column, Row } from '../layout'
import { Label } from '../texts'
import { type } from 'os'
import { Input } from '../input/InputRegular/styled'
import { Container, IconContainer } from '../input/InputWithIcon/styled'

interface IProps {
  name: string
  labelText?: string | null
  validationError?: boolean
  value?: Date
  disabled?: boolean
  onChange: (value: Date[]) => void
}

export interface IStyledProps {
  validationError?: boolean
  disabled?: boolean
}

const DatePicker: React.FC<IProps> = ({ name, value = new Date(), disabled, labelText, validationError, onChange }) => {
  const [date, setDate] = useState(value)

  const handleDateChange = (date: Date[]) => {
    setDate(date[0])
    onChange(date)
  }

  return (
    <Column>
      {labelText && <Label>{labelText}</Label>}
      <Row>
        <Column>
          <Container validationError={validationError}>
            <Row>
              <IconContainer disabled={disabled} validationError={validationError}>
                <Clock size={20} />
              </IconContainer>
              <Flatpickr
                options={{
                  enableTime: false,
                  dateFormat: 'M/d/Y'
                }}
                disabled={disabled}
                value={date}
                onChange={handleDateChange}
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
