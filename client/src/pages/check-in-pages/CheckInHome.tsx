import React from 'react'
import { Grid, Card, Text, useTheme } from '@nextui-org/react'

const CheckInHome = ({}) => {
  const { theme } = useTheme()
  const MockItem = ({ text }) => {
    return (
      <Card isHoverable isPressable css={{ $$cardColor: theme?.colors.yellow200 }} style={{ height: 250 }}>
        <Card.Body style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text h2 style={{ fontFamily: 'Satoshi-Bold', color: '#925D07' }} size={38}>
            {text}
          </Text>
        </Card.Body>
      </Card>
    )
  }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundImage:
          'url("https://res.cloudinary.com/de0xihdep/image/upload/v1668101735/wallpaperflare.com_wallpaper_nhysul.jpg")',
        backgroundSize: 'cover',
        backdropFilter: 'blur("8px")'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 36, padding: '0 40px' }}>
        <MockItem text="New consultation" />
        <MockItem text="Appointment" />
        <MockItem text="Drop of documents" />
        <MockItem text="Pick up documents" />
      </div>
    </div>
  )
}

export default CheckInHome
