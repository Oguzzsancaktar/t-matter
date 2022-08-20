import { Column, H1, ItemContainer, JustifyCenterColumn, Row, UserImage } from '@/components'
import colors from '@/constants/colors'
import React from 'react'

const OfflineUsers = () => {
  return (
    <ItemContainer width="100%" height="100%">
      <Row height="100%">
        <ItemContainer width="auto" height="100%" margin="0 1rem 0 0">
          <JustifyCenterColumn height="100%">
            <H1 textAlign="center" fontSize="0.8rem" color={colors.primary.middle}>
              5
            </H1>
            <H1 textAlign="center" fontSize="0.8rem" color={colors.blue.primary}>
              Offline
            </H1>
          </JustifyCenterColumn>
        </ItemContainer>
        <Row>
          <ItemContainer
            width="30px"
            height="30px"
            margin="0 0 0 -0.5rem"
            borderBottom={'1px solid ' + colors.white.primary}
            borderRight={'1px solid ' + colors.white.primary}
            borderLeft={'1px solid ' + colors.white.primary}
            borderTop={'1px solid ' + colors.white.primary}
            borderRadius={'50%'}
            overflow="hidden"
          >
            <UserImage padding="0" width="100%" height="100%" />
          </ItemContainer>
          <ItemContainer
            width="30px"
            height="30px"
            margin="0 0 0 -0.5rem"
            borderBottom={'1px solid ' + colors.white.primary}
            borderRight={'1px solid ' + colors.white.primary}
            borderLeft={'1px solid ' + colors.white.primary}
            borderTop={'1px solid ' + colors.white.primary}
            borderRadius={'50%'}
            overflow="hidden"
          >
            <UserImage padding="0" width="30px" height="30px" />
          </ItemContainer>
          <ItemContainer
            width="30px"
            height="30px"
            margin="0 0 0 -0.5rem"
            borderBottom={'1px solid ' + colors.white.primary}
            borderRight={'1px solid ' + colors.white.primary}
            borderLeft={'1px solid ' + colors.white.primary}
            borderTop={'1px solid ' + colors.white.primary}
            borderRadius={'50%'}
            overflow="hidden"
          >
            <UserImage padding="0" width="30px" height="30px" />
          </ItemContainer>
          <ItemContainer
            width="30px"
            height="30px"
            margin="0 0 0 -0.5rem"
            borderBottom={'1px solid ' + colors.white.primary}
            borderRight={'1px solid ' + colors.white.primary}
            borderLeft={'1px solid ' + colors.white.primary}
            borderTop={'1px solid ' + colors.white.primary}
            borderRadius={'50%'}
            overflow="hidden"
          >
            <UserImage padding="0" width="30px" height="30px" />
          </ItemContainer>
        </Row>
      </Row>
    </ItemContainer>
  )
}

export default OfflineUsers
