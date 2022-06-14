import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { ActionButtons } from '@/components/data-tables'
import { UserImage } from '@/components/image'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterColumn, JustifyCenterRow } from '@/components/layout'
import { H1, Label } from '@/components/texts'
import { InnerWrapper } from '@/components/wrapper'
import colors from '@/constants/colors'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus, IUser } from '@/models'
import { UserModalLogInTab, UserModalSettingsTab } from '@/pages'
import { useGetUserByIdQuery, useUpdateUserStatusMutation } from '@/services/settings/user-planning/userService'
import { openModal, closeModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import React, { useState } from 'react'
import { ReadUserModal } from '.'
import { ConfirmModal } from '../../general'
import UpdateUserModal from './UpdateUserModal'

interface IProps {
  userId: IUser['_id']
}

const UserReadModal: React.FC<IProps> = ({ userId }) => {
  const [updateUserStatus] = useUpdateUserStatusMutation()
  const { data: userData, isLoading: isUserDataLoading, isError: isUserDataError } = useGetUserByIdQuery(userId)

  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const [activeTab, setActiveTab] = useState('log-in')

  const renderSwitch = () => {
    switch (activeTab) {
      case 'log-in':
        return <UserModalLogInTab />
      case 'settings':
        return <UserModalSettingsTab />
    }
  }

  const handleRead = (user: IUser) => {
    dispatch(
      openModal({
        id: `userDetailModal-${user._id}`,
        title: 'User / ' + user.firstname + ' ' + user.lastname,
        body: <ReadUserModal userId={user._id} />,
        size: ESize.XLarge
      })
    )
  }

  const handleEdit = (user: IUser) => {
    dispatch(
      openModal({
        id: `updateUserModal-${user._id}`,
        title: 'Update User / ' + user.firstname + ' ' + user.lastname,
        body: <UpdateUserModal user={user} />,
        size: ESize.Small
      })
    )
  }

  const handleDelete = (user: IUser) => {
    dispatch(
      openModal({
        id: `deleteUserModal-${user._id}`,
        title: `Are you sure to inactivate ${user.firstname + ' ' + user.lastname}?`,
        body: (
          <ConfirmModal
            modalId={`deleteUserModal-${user._id}`}
            title={`Are you sure to inactivate ${user.firstname + ' ' + user.lastname}?`}
            onConfirm={() => handleOnConfirmDelete(user)}
          />
        ),
        size: ESize.Small
      })
    )
  }

  const handleReactive = (user: IUser) => {
    dispatch(
      openModal({
        id: `reactiveUserModal-${user._id}`,
        title: `Are you sure to reactivate ${user.firstname + ' ' + user.lastname}?`,
        body: (
          <ConfirmModal
            modalId={`reactiveUserModal-${user._id}`}
            title={`Are you sure to reactivate ${user.firstname + ' ' + user.lastname}?`}
            onConfirm={() => handleOnConfirmReactive(user)}
          />
        ),
        size: ESize.Small
      })
    )
  }

  const handleOnConfirmDelete = async (user: IUser) => {
    try {
      await updateUserStatus({ _id: user._id, status: EStatus.Inactive.toString() })
      toastSuccess('User ' + user.firstname + ' ' + user.lastname + ' inactivated successfully')
      dispatch(closeModal(`deleteUserModal-${user._id}`))
    } catch (error) {
      toastError('Error inactivating user')
    }
  }

  const handleOnConfirmReactive = async (user: IUser) => {
    try {
      await updateUserStatus({ _id: user._id, status: EStatus.Active.toString() })
      toastSuccess('User ' + user.firstname + ' ' + user.lastname + ' reactivated successfully')
      dispatch(closeModal(`reactiveUserModal-${user._id}`))
    } catch (error) {
      toastError('Error reactivating user')
    }
  }
  if (userData) {
    console.log(selectColorForStatus(EStatus[userData.status]))
  }

  return (
    <InnerWrapper>
      <JustifyBetweenRow height="100%">
        <ItemContainer width="350px" height="100%">
          {isUserDataLoading || !userData || isUserDataError ? (
            <div>Loading...</div>
          ) : (
            <JustifyBetweenColumn height="100%" padding="1rem 0">
              <ItemContainer height="150px">
                <JustifyBetweenColumn>
                  <ItemContainer>
                    <JustifyCenterColumn>
                      <UserImage width="100px" height="100px" src="https://via.placeholder.com/150" />
                      <H1 margin="0.5rem 0" textAlign="center">
                        {userData.firstname + ' ' + userData.lastname}
                      </H1>
                    </JustifyCenterColumn>
                  </ItemContainer>
                  <ItemContainer>
                    <JustifyCenterRow>
                      <ItemContainer width="auto" margin="0 0.5rem 0 0">
                        <Badge children={userData.role.name} color={colors.gray.dark} />
                      </ItemContainer>
                      <ItemContainer width="auto">
                        <Badge children={EStatus[userData.status]} color={selectColorForStatus(+userData.status)} />
                      </ItemContainer>
                    </JustifyCenterRow>
                  </ItemContainer>
                </JustifyBetweenColumn>
              </ItemContainer>

              <ItemContainer margin="1rem 0" height="calc(100% - 1rem - 1rem - 150px - 40px)">
                <JustifyBetweenColumn>
                  <ItemContainer margin="1rem 0">
                    <JustifyBetweenRow>
                      <ItemContainer width="90px" margin="0 0.5rem 0 0">
                        <H1 fontSize="13px" color={colors.black.dark}>
                          Address
                        </H1>
                      </ItemContainer>
                      <ItemContainer width="calc(100% - 90px - 0.5rem)">
                        <H1 fontSize="12px" color={colors.black.light}>
                          {userData.address +
                            ' ' +
                            userData.city +
                            ' ' +
                            userData.state +
                            ' ' +
                            userData.country +
                            ' ' +
                            userData.zipcode}
                        </H1>
                      </ItemContainer>
                    </JustifyBetweenRow>
                  </ItemContainer>

                  <ItemContainer margin="1rem 0">
                    <JustifyBetweenRow>
                      <ItemContainer width="90px" margin="0 0.5rem 0 0">
                        <H1 fontSize="13px" color={colors.black.dark}>
                          Email
                        </H1>
                      </ItemContainer>
                      <ItemContainer width="calc(100% - 90px - 0.5rem)">
                        <H1 fontSize="12px" color={colors.black.light}>
                          {userData.email}
                        </H1>
                      </ItemContainer>
                    </JustifyBetweenRow>
                  </ItemContainer>
                  <ItemContainer margin="1rem 0">
                    <JustifyBetweenRow>
                      <ItemContainer width="90px" margin="0 0.5rem 0 0">
                        <H1 fontSize="13px" color={colors.black.dark}>
                          Contact
                        </H1>
                      </ItemContainer>
                      <ItemContainer width="calc(100% - 90px - 0.5rem)">
                        <H1 fontSize="12px" color={colors.black.light}>
                          {userData.phone}
                        </H1>
                      </ItemContainer>
                    </JustifyBetweenRow>
                  </ItemContainer>
                  <ItemContainer margin="1rem 0">
                    <JustifyBetweenRow>
                      <ItemContainer width="90px" margin="0 0.5rem 0 0">
                        <H1 fontSize="13px" color={colors.black.dark}>
                          Birthday
                        </H1>
                      </ItemContainer>
                      <ItemContainer width="calc(100% - 90px - 0.5rem)">
                        <H1 fontSize="12px" color={colors.black.light}>
                          {userData.birthday}
                        </H1>
                      </ItemContainer>
                    </JustifyBetweenRow>
                  </ItemContainer>
                  <ItemContainer margin="1rem 0">
                    <JustifyBetweenRow>
                      <ItemContainer width="90px" margin="0 0.5rem 0 0">
                        <H1 fontSize="13px" color={colors.black.dark}>
                          Birth Location
                        </H1>
                      </ItemContainer>
                      <ItemContainer width="calc(100% - 90px - 0.5rem)">
                        <H1 fontSize="12px" color={colors.black.light}>
                          {userData.birthplace}
                        </H1>
                      </ItemContainer>
                    </JustifyBetweenRow>
                  </ItemContainer>
                </JustifyBetweenColumn>
              </ItemContainer>

              <ItemContainer height="40px">
                <JustifyCenterColumn>
                  <ActionButtons
                    iconSize="30px"
                    status={userData.status}
                    onRead={() => handleRead(userData!)}
                    onEdit={() => handleEdit(userData!)}
                    onHistory={function (): void {
                      throw new Error('Function not implemented.')
                    }}
                    onDelete={() => handleDelete(userData!)}
                    onReactive={() => handleReactive(userData!)}
                  />
                </JustifyCenterColumn>
              </ItemContainer>
            </JustifyBetweenColumn>
          )}
        </ItemContainer>

        <ItemContainer height="100%" width="120px" padding="1rem" backgroundColor={colors.gray.primary}>
          <JustifyBetweenColumn height="100%">
            <ItemContainer height="100%" margin="0 0 1rem 0">
              <Button color={colors.gray.secondary} onClick={() => setActiveTab('log-in')}>
                <H1 color={colors.gray.primary} textAlign="center">
                  Log In
                </H1>
              </Button>
            </ItemContainer>
            <ItemContainer height="100%" margin="0 0 0 0">
              <Button color={colors.gray.secondary} onClick={() => setActiveTab('settings')}>
                <H1 color={colors.gray.primary} textAlign="center">
                  Settings
                </H1>
              </Button>
            </ItemContainer>
          </JustifyBetweenColumn>
        </ItemContainer>
        <ItemContainer minHeight="700px" height="inherit" width="calc(100% - 120px - 350px)">
          {renderSwitch()}
        </ItemContainer>
      </JustifyBetweenRow>
    </InnerWrapper>
  )
}

export default UserReadModal
