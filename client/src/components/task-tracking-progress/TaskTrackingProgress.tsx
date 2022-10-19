import React from 'react'
import {
  Column,
  CustomerTaskModal,
  H1,
  ItemContainer,
  JustifyBetweenRow,
  ProgressBar,
  Row,
  UserImage
} from '@/components'
import colors from '@/constants/colors'
import { IActiveTaskStep, ITaskStep } from '@models/Entities/workflow/task/ICustomerTask'
import useAccessStore from '@hooks/useAccessStore'
import { openModal } from '@/store'
import { ESize } from '@/models'
import { Avatar } from '@nextui-org/react'

interface ITaskTrackingProgressProps {
  activeTaskStep: IActiveTaskStep
}

const TaskTrackingProgress: React.FC<ITaskTrackingProgressProps> = ({ activeTaskStep }) => {
  const { useAppDispatch } = useAccessStore()
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(
      openModal({
        id: 'customerTaksModal' + activeTaskStep.task._id,
        title: 'Customer Task',
        body: (
          <CustomerTaskModal
            customer={activeTaskStep.task.customer}
            customerId={activeTaskStep.task.customer?._id}
            taskId={activeTaskStep.task._id as string}
          />
        ),
        width: ESize.WXLarge,
        height: ESize.HLarge,
        maxWidth: ESize.WXLarge,
        backgroundColor: colors.gray.light
      })
    )
  }

  return (
    <ItemContainer onClick={handleClick} borderRadius="0.3rem">
      <JustifyBetweenRow>
        <ItemContainer height="30px" width="30px" margin=" 0 0.5rem 0 0">
          <Avatar
            size="md"
            pointer
            src={activeTaskStep.user.profile_img}
            text={activeTaskStep.user.firstname[0] + '' + activeTaskStep.user.lastname[0]}
            bordered
            stacked
            zoomed
            squared
          />
        </ItemContainer>
        <Column>
          <ItemContainer>
            <JustifyBetweenRow>
              <Row>
                <H1 width="auto" color={colors.text.primary}>
                  {activeTaskStep.task.name}
                </H1>
                <H1 margin="0 0 0 0.25rem" color={colors.blue.primary} width="auto">
                  {activeTaskStep.task.steps[activeTaskStep.activeTaskStep].category.name}
                </H1>
              </Row>
            </JustifyBetweenRow>
          </ItemContainer>
          <ItemContainer>
            <ProgressBar completionPercentage={0} completionColor={colors.blue.primary} />
          </ItemContainer>
        </Column>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default TaskTrackingProgress
