import colors from '@/constants/colors'
import { IUser } from '@/models'
import { useGetUsersQuery } from '@/services/settings/user-planning/userService'
import React, { useState } from 'react'
import styled from 'styled-components'
import { UserImage } from '../image'
import { ItemContainer } from '../item-container'
import { JustifyCenterRow, Row } from '../layout'
import { H1 } from '../texts'

interface IProps {}

const RelativeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const UserList = styled.ul`
  width: 250px;
  border-radius: 0.3rem;
  position: absolute;
  background-color: ${colors.white.primary};
  top: 0;
  left: calc(100% + 1rem);
  max-height: 250px;
  overflow-y: auto;
`

const UserListItem = styled.li`
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    background-color: ${colors.white.primary};
  }
`

const UserSelect: React.FC<IProps> = () => {
  const [showUserList, setShowUserList] = useState<boolean>(false)
  const { data: userListData, isLoading: userListIsLoading } = useGetUsersQuery()

  const handleUserList = () => {
    setShowUserList(!showUserList)
  }

  console.log(userListData)

  return (
    <ItemContainer>
      <RelativeContainer>
        <ItemContainer onClick={handleUserList}>
          <JustifyCenterRow>
            <UserImage src="" width="40px" height="40px" />
          </JustifyCenterRow>
        </ItemContainer>
        {showUserList && !userListIsLoading && userListData && (
          <UserList>
            {userListData?.map((user, index: number) => (
              <UserListItem key={index}>
                <Row>
                  <ItemContainer width="30px">
                    <UserImage src="" width="30px" height="30px" />
                  </ItemContainer>
                  <ItemContainer>
                    <H1>{user.firstname + ' ' + user.lastname}</H1>
                  </ItemContainer>
                </Row>
              </UserListItem>
            ))}
          </UserList>
        )}
      </RelativeContainer>
    </ItemContainer>
  )
}

export default UserSelect
