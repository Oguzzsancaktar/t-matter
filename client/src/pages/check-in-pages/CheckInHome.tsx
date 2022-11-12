import React from 'react'
import { Card, Text, useTheme, Row, Col, Spacer } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import {
  useGetJobTitlesQuery,
  useGetRefferedBysQuery
} from '@services/settings/company-planning/dynamicVariableService'
import { emptyQueryParams } from '@constants/queryParams'
import { useGetUsersQuery } from '@services/settings/user-planning/userService'

const CheckInHome = ({}) => {
  const { theme } = useTheme()
  const navigate = useNavigate()
  const { data: refferedByData, isLoading: refferedByDataIsLoading } = useGetRefferedBysQuery(emptyQueryParams)
  const { data: jobTitleData, isLoading: jobTitleDataIsLoading } = useGetJobTitlesQuery(emptyQueryParams)
  const { data: users } = useGetUsersQuery(emptyQueryParams)

  const MockItem = ({ text, to }) => {
    return (
      <Card
        onClick={() => {
          navigate(to)
        }}
        isHoverable
        isPressable
        css={{ $$cardColor: theme?.colors.gray700 }}
        style={{ height: 250, opacity: 0.8 }}
      >
        <Card.Body style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text h2 style={{ fontFamily: 'Satoshi-Bold', color: '#fff', opacity: 1 }} size={34}>
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
        backgroundImage: 'url("https://res.cloudinary.com/de0xihdep/image/upload/v1668291695/bg_hjkbhv.jpg")',
        backgroundSize: 'cover',
        backdropFilter: 'blur(8px)',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}
    >
      <Col>
        <Row
          style={{ position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center', top: 175 }}
        >
          <Text h2 style={{ fontFamily: 'Satoshi-Bold', color: '#C3F4FD', opacity: 0.8 }} size={48}>
            BK Law Firm ( Melinda Basaran )
          </Text>
        </Row>
        <Col style={{ padding: 40 }}>
          <Spacer y={2} />
          <Row justify="center">
            <MockItem to="/checkin/walk-in" text="Walk in" />
            <Spacer x={6} />
            <MockItem to="/checkin/appointment" text="Appointment" />
          </Row>
          <Spacer y={4} />
          <Row justify="center">
            <MockItem to="/checkin/drop-of-documents" text="Drop of documents" />
            <Spacer x={6} />
            <MockItem to="/checkin/pick-up-documents" text="Pick up documents" />
          </Row>
        </Col>
      </Col>
    </div>
  )
}

export default CheckInHome
