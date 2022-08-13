import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { ActionButtons } from '@/components/data-tables'
import { UserImage } from '@/components/image'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterColumn, JustifyCenterRow } from '@/components/layout'
import { H1 } from '@/components/texts'
import colors from '@/constants/colors'
import useAccessStore from '@/hooks/useAccessStore'
import { ESize, EStatus, IUser } from '@/models'
import { UserModalLogInTab, UserModalSettingsTab } from '@/pages'
import { useGetUserByIdQuery, useUpdateUserStatusMutation } from '@/services/settings/user-planning/userService'
import { openModal, closeModal } from '@/store'
import { selectColorForStatus } from '@/utils/statusColorUtil'
import { toastSuccess, toastError } from '@/utils/toastUtil'
import moment from 'moment'
import React, { useState } from 'react'
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
        return <UserModalLogInTab userId={userId} />
      case 'settings':
        return <UserModalSettingsTab userId={userId} />
    }
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
      await updateUserStatus({ _id: user._id, status: EStatus.Inactive })
      toastSuccess('User ' + user.firstname + ' ' + user.lastname + ' inactivated successfully')
      dispatch(closeModal(`deleteUserModal-${user._id}`))
    } catch (error) {
      toastError('Error inactivating user')
    }
  }

  const handleOnConfirmReactive = async (user: IUser) => {
    try {
      await updateUserStatus({ _id: user._id, status: EStatus.Active })
      toastSuccess('User ' + user.firstname + ' ' + user.lastname + ' reactivated successfully')
      dispatch(closeModal(`reactiveUserModal-${user._id}`))
    } catch (error) {
      toastError('Error reactivating user')
    }
  }

  return (
    <ItemContainer borderRadius="0.3rem" overflow="visible" backgroundColor="transparent" height="100%">
      <JustifyBetweenRow height="100%">
        <ItemContainer width="350px" height="100%" backgroundColor={colors.white.secondary} borderRadius="0.3rem">
          {isUserDataLoading || !userData || isUserDataError ? (
            <div>Loading...</div>
          ) : (
            <JustifyBetweenColumn height="100%" padding="1rem">
              <ItemContainer height="150px">
                <JustifyBetweenColumn>
                  <ItemContainer>
                    <JustifyCenterColumn>
                      <UserImage width="100px" height="100px" src="https://via.placeholder.com/150" />
                      <H1 fontSize="1.2rem" textAlign="center" color={colors.text.primary} margin="1rem 0">
                        {userData.firstname + ' ' + userData.lastname}
                      </H1>
                    </JustifyCenterColumn>
                  </ItemContainer>
                  <ItemContainer borderBottom={'1px solid ' + colors.white.primary} padding="0 0 0.5rem 0">
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

              <ItemContainer padding="1rem 0" height="calc(100% - 1rem - 1rem - 150px - 40px - 1rem)">
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
                          {moment(userData.birthday).format('MMMM-DD-YYYY')}
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

              <ItemContainer height="40px" borderBottom={'1px solid ' + colors.white.primary} padding="0 0 0.5rem 0">
                <JustifyCenterColumn width="100%">
                  <ActionButtons
                    rowWidth="100%"
                    iconSize="30px"
                    buttonWidth="100%"
                    status={userData.status}
                    onEdit={() => handleEdit(userData)}
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
        <ItemContainer
          height="100%"
          width="120px"
          padding="1rem"
          borderRadius="0.3rem"
          backgroundColor={colors.white.secondary}
        >
          <JustifyBetweenColumn height="100%">
            <ItemContainer height="100%" margin="0 0 0.25rem 0">
              <Button
                color={activeTab === 'log-in' ? colors.blue.primary : colors.gray.secondary}
                onClick={() => setActiveTab('log-in')}
              >
                <H1 color={activeTab === 'log-in' ? colors.white.primary : colors.gray.primary} textAlign="center">
                  Activity
                </H1>
              </Button>
            </ItemContainer>
            <ItemContainer height="100%" margin="0 0 0 0">
              <Button
                color={activeTab === 'settings' ? colors.blue.primary : colors.gray.secondary}
                onClick={() => setActiveTab('settings')}
              >
                <H1 color={activeTab === 'settings' ? colors.white.primary : colors.gray.primary} textAlign="center">
                  Settings
                </H1>
              </Button>
            </ItemContainer>
          </JustifyBetweenColumn>
        </ItemContainer>
        <ItemContainer
          minHeight="700px"
          height="inherit"
          width="calc(100% - 120px - 350px - 0.5rem)"
          backgroundColor={colors.white.secondary}
          borderRadius="0.3rem"
        >
          {renderSwitch()}
        </ItemContainer>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default UserReadModal
