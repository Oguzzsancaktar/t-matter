import { ItemContainer } from '@/components/item-container'
import { Column, Row } from '@/components/layout'
import { Label } from '@/components/texts'
import colors from '@/constants/colors'
import { useOutsideAlerter } from '@/hooks/useOutsideAlerter'
import { RowStyled } from '@/shared'
import * as React from 'react'
import { useRef, useState } from 'react'
import { Clock } from 'react-feather'
import TimeKeeper from 'react-timekeeper'
import styled from 'styled-components'
import { InputWithIcon } from '../InputWithIcon'

interface IProps {
  name: string
  labelText?: string | null
  validationError?: boolean
  value?: string
  disabled?: boolean
  onChange: (value: string) => void
}

export interface IStyledProps {
  validationError?: boolean
  disabled?: boolean
}

const ClockPickerRelative = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const ClockPicker24: React.FC<IProps> = ({ name, value = '00:00', disabled, labelText, validationError, onChange }) => {
  const [showTime, setShowTime] = useState(false)

  const timePickerRef = useRef(null)
  useOutsideAlerter(timePickerRef, () => setShowTime(false))

  const handleChange = (newTime: any) => {
    onChange(newTime.formatted24)
  }

  return (
    <Column>
      {labelText && (
        <ItemContainer margin="0 0 0.4rem 0">
          <Label color={colors.text.primary}>{labelText}</Label>{' '}
        </ItemContainer>
      )}
      <Row>
        <ClockPickerRelative>
          <InputWithIcon
            disabled={disabled}
            onChange={e => onChange(e.target.value)}
            name={name}
            placeholder="Select time"
            type="text"
            value={value}
            children={<Clock size={20} />}
            onFocus={() => setShowTime(true)}
            // onBlur={() => setShowTime(false)}
          />

          {showTime && (
            <div ref={timePickerRef}>
              <TimeKeeper
                time={value.trim()}
                onChange={newTime => handleChange(newTime)}
                onDoneClick={() => setShowTime(false)}
                switchToMinuteOnHourSelect
                hour24Mode={true}
              />
            </div>
          )}
        </ClockPickerRelative>
      </Row>
    </Column>
  )
}

export default ClockPicker24
