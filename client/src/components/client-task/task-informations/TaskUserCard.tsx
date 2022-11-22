import { Badge } from '@/components/badge'
import { UserImage } from '@/components/image'
import { ItemContainer } from '@/components/item-container'
import { JustifyBetweenColumn, JustifyBetweenRow, JustifyCenterColumn, JustifyCenterRow } from '@/components/layout'
import { ReadCustomerModal } from '@/components/modals'
import { H1 } from '@/components/texts'
import { UserSelect } from '@/components/user-select'
import colors from '@/constants/colors'
import useAccessStore from '@/hooks/useAccessStore'
import { useAuth } from '@/hooks/useAuth'
import { ESize, ETaskStatus, ICustomer, ICustomerTask, ITaskItem, IUser } from '@/models'
import { openModal } from '@/store'
import { selectColorForTaskStatus } from '@/utils/statusColorUtil'
import React from 'react'

interface IProps {
  taskActiveStep: ITaskItem
  isTaskNotStarted: boolean
  onResponsibleChange: (responsible: IUser) => void
  handleCancelTask: () => void
  handleStartTask: () => void
  taskData: ICustomerTask
  customer: ICustomer
}
const TaskUserCard: React.FC<IProps> = ({
  taskActiveStep,
  isTaskNotStarted,
  taskData,
  customer,
  onResponsibleChange,
  handleCancelTask,
  handleStartTask
}) => {
  const { loggedUser } = useAuth()
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const isResponsibleUserCurrentLoggedUser = taskActiveStep.responsibleUser._id === loggedUser.user?._id
  const canResponsibleUserChange: boolean =
    taskActiveStep.stepStatus === ETaskStatus['Progress'] || taskActiveStep.stepStatus === ETaskStatus['Not_Started']
  const canTaskCancel: boolean = canResponsibleUserChange && isResponsibleUserCurrentLoggedUser

  const handleCustomerClick = () => {
    if (customer) {
      dispatch(
        openModal({
          id: `customerDetailModal-${customer._id}`,
          title: 'Customer / ' + customer?.firstname + ' ' + customer?.lastname,
          body: <ReadCustomerModal customer={customer} />,
          width: ESize.WXLarge,
          height: ESize.HLarge,
          backgroundColor: 'transparent'
        })
      )
    }
  }

  return (
    <ItemContainer height="100%">
      <JustifyBetweenRow height="100%">
        <ItemContainer
          cursorType="pointer"
          width="calc((100% - 200px - 2rem)/2)"
          height="100%"
          onClick={handleCustomerClick}
        >
          <JustifyBetweenColumn height="100%" width="100%">
            <UserImage
              height="100%"
              padding="0"
              data-tip={customer.firstname + ' ' + customer.lastname}
              src={customer?.profile_img}
            />

            {/* <H1 textAlign="center" color={colors.text.primary} fontSize="0.8rem">
              Client
            </H1> */}
          </JustifyBetweenColumn>
        </ItemContainer>

        <ItemContainer width="200px" margin="0 1rem" height="100%">
          <JustifyBetweenColumn height="100%" width="100%">
            <H1
              width="100%"
              height="calc(100% - 20px - 20px)"
              textAlign="center"
              fontWeight="900"
              fontSize="14px"
              color={colors.blue.primary}
            >
              {taskData.name}
            </H1>
            <ItemContainer
              width="100%"
              backgroundColor={colors.gray.middle}
              height="20px"
              borderRadius="0.3rem"
              margin="0 0 0.25rem 0"
            >
              <JustifyCenterColumn width="100%" height="100%">
                <H1 width="100%" textAlign="center" fontWeight="600" fontSize="14px" color={colors.primary.dark}>
                  {taskActiveStep?.category.name}
                </H1>
              </JustifyCenterColumn>
            </ItemContainer>

            <ItemContainer width="100%" height="20px">
              <JustifyCenterRow width="100%" height="20px">
                <Badge
                  width="100%"
                  height="20px"
                  children={
                    <H1
                      fontSize="14px"
                      width="100%"
                      textAlign="center"
                      color={selectColorForTaskStatus(taskActiveStep?.stepStatus)}
                    >
                      {Object.values(ETaskStatus)[taskActiveStep?.stepStatus]?.toString().replace('_', ' ')}
                    </H1>
                  }
                  color={selectColorForTaskStatus(taskActiveStep?.stepStatus)}
                />
              </JustifyCenterRow>
            </ItemContainer>
          </JustifyBetweenColumn>
        </ItemContainer>

        <ItemContainer width="calc((100% - 200px - 2rem)/2)" height="100%">
          <JustifyBetweenColumn height="100%" width="100%">
            <ItemContainer height="100%">
              <UserSelect
                disabled={!canResponsibleUserChange}
                selectedUser={taskActiveStep?.responsibleUser}
                onResponsibleChange={onResponsibleChange}
              />
            </ItemContainer>
            {/* <H1 textAlign="center" color={colors.text.primary} fontSize="0.8rem">
              User
            </H1> */}
          </JustifyBetweenColumn>
        </ItemContainer>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default TaskUserCard
