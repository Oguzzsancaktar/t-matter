import React from 'react'
import { Grid, Card, Text, useTheme } from '@nextui-org/react'

const CheckInHome = ({}) => {
  const { theme } = useTheme()
  const MockItem = ({ text }) => {
    return (
      <Card isHoverable isPressable style={{ height: 250 }}>
        <Card.Body style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text h2 size={38} color="black" css={{ mt: 0 }}>
            {text}
          </Text>
        </Card.Body>
      </Card>
    )
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '20px', padding: '0 16px' }}>
        <MockItem text="New consultation" />
        <MockItem text="Appointment" />
        <MockItem text="Drop of documents" />
        <MockItem text="Pick up documents" />
      </div>
    </div>
  )
}

export default CheckInHome
