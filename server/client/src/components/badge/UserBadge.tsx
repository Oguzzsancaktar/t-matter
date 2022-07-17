import colors from '@/constants/colors'
import React from 'react'
import CircleImage from '../image/CircleImage'
import { Row, Column } from '../layout'
import { H1, Label } from '../texts'

interface IProps {
  userImage: string
  userName: string
  userEmail: string
}
const UserBadge: React.FC<IProps> = ({ userImage, userName, userEmail }) => {
  return (
    <Row>
      <Column width="35px" margin="0 0.5rem 0 0">
        <CircleImage height="35px" width="35px" imageUrl={userImage} />
      </Column>

      <Column width="calc(100% - 35px - 0.5rem)">
        <Row>
          <H1 color={colors.black.primary}>{userName}</H1>
        </Row>
        <Row>
          <H1 color={colors.gray.dark} fontSize={'0.8rem'}>
            {userEmail}
          </H1>
        </Row>
      </Column>
    </Row>
  )
}

export default UserBadge
