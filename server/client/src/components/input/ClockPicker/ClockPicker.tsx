import { Row } from '@/components/layout'
import * as React from 'react'
import { useState } from 'react'
import { Clock } from 'react-feather'
import TimeKeeper from 'react-timekeeper'
import styled from 'styled-components'
import { InputWithIcon } from '../InputWithIcon'

interface IProps {
  name: string
}
const ClockPickerRelative = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const ClockPicker: React.FC<IProps> = ({ name }) => {
  const [time, setTime] = useState('12:34pm')
  const [showTime, setShowTime] = useState(false)

  return (
    <Row>
      <ClockPickerRelative>
        <InputWithIcon
          onChange={e => console.log(e)}
          name={name}
          placeholder="00:00"
          type="text"
          value={time}
          children={<Clock />}
          onFocus={() => setShowTime(true)}
          onBlur={() => setShowTime(false)}
        />

        {showTime && (
          <TimeKeeper
            time={time}
            onChange={newTime => setTime(newTime.formatted12)}
            onDoneClick={() => setShowTime(false)}
            switchToMinuteOnHourSelect
          />
        )}
      </ClockPickerRelative>
    </Row>
  )
}

export default ClockPicker
