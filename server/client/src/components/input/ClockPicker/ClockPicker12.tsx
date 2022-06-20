import * as React from 'react'
import { Column, Row } from '@/components/layout'
import { Label } from '@/components/texts'
import colors from '@/constants/colors'
import { useOutsideTrigger } from '@/hooks/useOutsideTrigger'
import { useRef, useState } from 'react'
import { Clock } from 'react-feather'
import TimeKeeper from 'react-timekeeper'
import styled from 'styled-components'
import { InputWithIcon } from '../InputWithIcon'
import { ItemContainer } from '@/components/item-container'

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

const ClockPicker12: React.FC<IProps> = ({ name, value = '00:00', disabled, labelText, validationError, onChange }) => {
  const [showTime, setShowTime] = useState(false)

  const timePickerRef = useRef(null)
  useOutsideTrigger(timePickerRef, () => setShowTime(false))

  const handleChange = (newTime: any) => {
    onChange(newTime.formatted12)
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
            name={name}
            value={value}
            type="text"
            validationError={validationError}
            disabled={disabled}
            children={<Clock size={20} />}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setShowTime(true)}
          />

          {showTime && (
            <div ref={timePickerRef}>
              <TimeKeeper
                time={value}
                onChange={newTime => handleChange(newTime)}
                onDoneClick={() => setShowTime(false)}
                switchToMinuteOnHourSelect
                // hour24Mode={true}
              />
            </div>
          )}
        </ClockPickerRelative>
      </Row>
    </Column>
  )
}

export default ClockPicker12
