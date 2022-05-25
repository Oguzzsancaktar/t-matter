import { Row } from '@/components/layout'
import { useOutsideAlerter } from '@/hooks/useOutsideAlerter'
import * as React from 'react'
import { useRef, useState } from 'react'
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

  const timePickerRef = useRef(null)
  useOutsideAlerter(timePickerRef, () => setShowTime(false))

  const handleChange = (newTime: any) => {
    setTime(newTime.formatted12)
    onChange(time)
  }

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
          <div ref={timePickerRef}>
            <TimeKeeper
              time={time}
              onChange={newTime => handleChange(newTime)}
              onDoneClick={() => setShowTime(false)}
              switchToMinuteOnHourSelect
              // hour24Mode={true}
            />
          </div>
        )}
      </ClockPickerRelative>
    </Row>
  )
}

export default ClockPicker
