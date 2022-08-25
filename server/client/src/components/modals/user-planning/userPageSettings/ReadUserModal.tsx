import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { ActionButtons } from '@/components/data-tables'
import { UserImage } from '@/components/image'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterColumn, JustifyCenterRow } from '@/components/layout'
import { UserSkeletonLoader } from '@/components/skelton-loader'
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
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WMedium
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
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
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
        width: ESize.WLarge,
        height: ESize.HAuto,
        maxWidth: ESize.WSmall
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
    <ItemContainer borderRadius="0.3rem" overflow="visible" height="100%">
      <JustifyBetweenRow height="100%">
        <ItemContainer
          width="350px"
          height="100%"
          backgroundColor={colors.white.secondary}
          borderRadius="0.3rem 0 0 0.3rem"
        >
          {isUserDataLoading || !userData || isUserDataError || false ? (
            <UserSkeletonLoader />
          ) : (
            <JustifyBetweenColumn height="100%" padding="1rem">
              <ItemContainer height="200px">
                <JustifyBetweenColumn>
                  <ItemContainer borderBottom={'1px solid ' + colors.white.primary} padding="0 0 1rem 0">
                    <JustifyCenterColumn>
                      <UserImage width="100px" height="100px" src="https://via.placeholder.com/150" />
                    </JustifyCenterColumn>
                  </ItemContainer>
                  <ItemContainer>
                    <H1 fontSize="1.2rem" textAlign="center" color={colors.text.primary} margin="1rem 0">
                      {userData.firstname + ' ' + userData.lastname}
                    </H1>
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

              <ItemContainer height="calc(100% - 200px - 40px - 1rem)">
                <JustifyBetweenColumn>
                  <ItemContainer margin="0.5rem 0">
                    <JustifyCenterRow>
                      <H1 fontSize="12px" color={colors.black.light} textAlign="center">
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
                    </JustifyCenterRow>
                  </ItemContainer>

                  <ItemContainer margin="0.5rem 0">
                    <ItemContainer>
                      <H1 fontSize="12px" color={colors.black.light} textAlign="center">
                        {userData.email}
                      </H1>
                    </ItemContainer>
                  </ItemContainer>
                  <ItemContainer margin="0.5rem 0">
                    <ItemContainer>
                      <H1 fontSize="12px" color={colors.black.light} textAlign="center">
                        {userData.phone}
                      </H1>
                    </ItemContainer>
                  </ItemContainer>
                  <ItemContainer margin="0.5rem 0">
                    <ItemContainer>
                      <H1 fontSize="12px" color={colors.black.light} textAlign="center">
                        {moment(userData.birthday).format('MMMM-DD-YYYY')}
                      </H1>
                    </ItemContainer>
                  </ItemContainer>
                  <ItemContainer margin="0.5rem 0">
                    <ItemContainer>
                      <H1 fontSize="12px" color={colors.black.light} textAlign="center">
                        {userData.birthplace}
                      </H1>
                    </ItemContainer>
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
        <ItemContainer height="100%" width="120px" padding="1rem" backgroundColor={colors.gray.disabled}>
          <JustifyBetweenColumn height="100%">
            <ItemContainer height="100%" margin="0 0 0.25rem 0">
              <Button
                color={activeTab === 'log-in' ? colors.blue.primary : colors.primary.dark}
                onClick={() => setActiveTab('log-in')}
              >
                <H1 color={activeTab === 'log-in' ? colors.gray.primary : colors.white.primary} textAlign="center">
                  Activity
                </H1>
              </Button>
            </ItemContainer>

            <ItemContainer height="100%" margin="0 0 0.25rem 0">
              <Button
                color={activeTab === 'calendar' ? colors.blue.primary : colors.primary.dark}
                onClick={() => setActiveTab('calendar')}
              >
                <H1 color={activeTab === 'calendar' ? colors.gray.primary : colors.white.primary} textAlign="center">
                  Calendar
                </H1>
              </Button>
            </ItemContainer>

            <ItemContainer height="100%" margin="0 0 0.25rem 0">
              <Button
                color={activeTab === 'hr-activity' ? colors.blue.primary : colors.primary.dark}
                onClick={() => setActiveTab('hr-activity')}
              >
                <H1 color={activeTab === 'hr-activity' ? colors.gray.primary : colors.white.primary} textAlign="center">
                  HR Activity
                </H1>
              </Button>
            </ItemContainer>

            <ItemContainer height="100%" margin="0 0 0.25rem 0">
              <Button
                color={activeTab === 'bonus' ? colors.blue.primary : colors.primary.dark}
                onClick={() => setActiveTab('bonus')}
              >
                <H1 color={activeTab === 'bonus' ? colors.gray.primary : colors.white.primary} textAlign="center">
                  Bonus
                </H1>
              </Button>
            </ItemContainer>
            <ItemContainer height="100%" margin="0 0 0 0">
              <Button
                color={activeTab === 'settings' ? colors.blue.primary : colors.primary.dark}
                onClick={() => setActiveTab('settings')}
              >
                <H1 color={activeTab === 'settings' ? colors.gray.primary : colors.white.primary} textAlign="center">
                  Settings
                </H1>
              </Button>
            </ItemContainer>
          </JustifyBetweenColumn>
        </ItemContainer>
        <ItemContainer
          minHeight="700px"
          height="inherit"
          width="calc(100% - 120px - 350px )"
          backgroundColor={colors.white.secondary}
          borderRadius="0 0.3rem 0.3rem 0"
        >
          {renderSwitch()}
        </ItemContainer>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default UserReadModal
