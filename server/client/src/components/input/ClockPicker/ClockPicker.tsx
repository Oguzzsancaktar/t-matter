import { Row } from '@/components/layout'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Clock } from 'react-feather'
import TimeKeeper from 'react-timekeeper'
import styled from 'styled-components'
import { InputWithIcon } from '../InputWithIcon'

interface IProps {
  name: string
  onChange: (value: string) => void
}
const ClockPickerRelative = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const ClockPicker: React.FC<IProps> = ({ name, onChange }) => {
  const [time, setTime] = useState('09:00am')
  const [showTime, setShowTime] = useState(false)

  useEffect(() => {
    onChange(time)
  }, [time, onChange])

  return (
    <Row>
      <ClockPickerRelative>
        <InputWithIcon
          onChange={e => onChange(e.target.value)}
          name={name}
          placeholder="00:00"
          type="text"
          value={time}
          children={<Clock />}
          onFocus={() => setShowTime(true)}
          // onBlur={() => setShowTime(false)}
        />

        {showTime && (
          <TimeKeeper
            time={time}
            onChange={newTime => setTime(newTime.formatted12)}
            onDoneClick={() => setShowTime(false)}
            switchToMinuteOnHourSelect
            // hour24Mode={true}
          />
        )}
      </ClockPickerRelative>
    </Row>
  )
}

export default ClockPicker
