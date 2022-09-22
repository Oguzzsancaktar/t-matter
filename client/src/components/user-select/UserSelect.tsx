import colors from '@/constants/colors'
import { emptyQueryParams } from '@/constants/queryParams'
import { useOutsideTrigger } from '@/hooks/useOutsideTrigger'
import { IUser } from '@/models'
import { useGetUsersQuery } from '@/services/settings/user-planning/userService'
import React, { useRef, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'
import { UserImage } from '../image'
import { ItemContainer } from '../item-container'
import { JustifyCenterRow, Row } from '../layout'
import { H1 } from '../texts'

interface IProps {
  selectedUser?: Pick<IUser, '_id' | 'firstname' | 'lastname' | 'profile_img'> | IUser
  disabled?: boolean
  onResponsibleChange: (responsible: IUser) => void
}

const RelativeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const UserList = styled.ul`
  z-index: 99;
  width: 250px;
  border-radius: 0.3rem;
  position: absolute;
  background-color: ${colors.white.secondary};
  top: 0;
  left: calc(100% + 1rem);
  max-height: 250px;
  overflow-y: auto;
  box-shadow: 0px 4px 10px #00000041;
`

const UserListItem = styled.li`
  cursor: pointer;
  padding: 0.5rem;
  border-bottom: 1px solid ${colors.gray.disabled};

  &:hover {
    background-color: ${colors.white.primary};
  }
`

const UserSelect: React.FC<IProps> = ({ selectedUser, disabled, onResponsibleChange }) => {
  const [searchQueryParams, setSearchQueryParams] = useState(emptyQueryParams)

  const [showUserList, setShowUserList] = useState<boolean>(false)
  const { data: userListData, isLoading: userListIsLoading } = useGetUsersQuery(searchQueryParams)

  const userSelectRef = useRef(null)
  useOutsideTrigger(userSelectRef, () => setShowUserList(false))

  const handleUserList = () => {
    if (!disabled) {
      setShowUserList(!showUserList)
    }
  }

  const handleUserClick = (user: IUser) => {
    onResponsibleChange(user)
    setShowUserList(false)
  }

  return (
    <div ref={userSelectRef}>
      <ItemContainer width="100%" height="100%">
        <RelativeContainer>
          <ItemContainer width="100%" height="100%" onClick={handleUserList} cursorType="pointer">
            {selectedUser ? (
              <JustifyCenterRow data-tip={selectedUser?.firstname + ' ' + selectedUser?.lastname}>
                <UserImage padding="0" src={selectedUser?.profile_img} width="100%" height="100%" />
              </JustifyCenterRow>
            ) : (
              <JustifyCenterRow>
                <UserImage padding="0" width="100%" height="100%" />
              </JustifyCenterRow>
            )}
          </ItemContainer>
          {showUserList && !userListIsLoading && userListData && (
            <UserList>
              {userListData?.map((user, index: number) => (
                <UserListItem key={index} onClick={() => handleUserClick(user)}>
                  <Row>
                    <ItemContainer width="30px">
                      <UserImage src={user?.profile_img} width="30px" height="30px" padding="0" />
                    </ItemContainer>
                    <ItemContainer margin="0 0 0 1rem">
                      <H1 color={colors.text.primary}>{user?.firstname + ' ' + user?.lastname}</H1>
                    </ItemContainer>
                  </Row>
                </UserListItem>
              ))}
            </UserList>
          )}
        </RelativeContainer>
        <ReactTooltip className="tooltip-z-index" />
      </ItemContainer>
    </div>
  )
}

export default UserSelect
