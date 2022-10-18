import { Column, H1, ItemContainer, JustifyCenterColumn, Row, UserImage } from '@/components'
import colors from '@/constants/colors'
import React, { useState } from 'react'
import { Avatar, Grid, Tooltip } from '@nextui-org/react'
import { useGetUsersQuery } from '@services/settings/user-planning/userService'
import { emptyQueryParams } from '@constants/queryParams'
import useAccessStore from '@hooks/useAccessStore'

const OfflineUsers = () => {
  const { data: users } = useGetUsersQuery(emptyQueryParams)
  const { useAppSelector } = useAccessStore()
  const [isOnline, setIsOnline] = useState(false)

  const onlineUsers = useAppSelector(state => state.onlineUsers.onlineUsers)

  const offlineUserArr = users?.filter(u => !onlineUsers.includes(u._id)) || []
  const onlineUserArr = users?.filter(u => onlineUsers.includes(u._id)) || []
  const userArr = isOnline ? onlineUserArr : offlineUserArr
  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', overflowX: 'auto' }}>
      <Row height="100%">
        <div
          style={{ cursor: 'pointer', height: '100%', marginRight: '1rem', width: 'auto' }}
          onClick={() => setIsOnline(!isOnline)}
        >
          <JustifyCenterColumn height="100%">
            <H1 textAlign="center" fontSize="0.8rem" color={colors.primary.middle}>
              {userArr.length}
            </H1>
            <H1 textAlign="center" fontSize="0.8rem" color={colors.blue.primary}>
              {isOnline ? 'Online' : 'Offline'}
            </H1>
          </JustifyCenterColumn>
        </div>
        <Row>
          <Avatar.Group animated>
            {userArr?.map((user, index) => (
              <Tooltip key={index} animated placement="rightEnd" content={user.firstname + ' ' + user.lastname}>
                <Avatar
                  size="lg"
                  pointer
                  src={user.profile_img}
                  text={user.firstname[0] + '' + user.lastname[0]}
                  bordered
                  stacked
                  zoomed
                  color={isOnline ? 'success' : 'default'}
                />
              </Tooltip>
            ))}
          </Avatar.Group>
        </Row>
      </Row>
    </div>
  )
}

export default OfflineUsers
