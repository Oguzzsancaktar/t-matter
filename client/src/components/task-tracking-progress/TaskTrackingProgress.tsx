import React from 'react'
import {
  Column,
  CustomerTaskModal,
  H1,
  ItemContainer,
  JustifyBetweenRow,
  JustifyCenterRow,
  ProgressBar,
  Row,
  UserImage
} from '@/components'
import colors from '@/constants/colors'
import { IActiveTaskStep } from '@models/Entities/workflow/task/ICustomerTask'
import useAccessStore from '@hooks/useAccessStore'
import { openModal } from '@/store'
import { ESize } from '@/models'
import { Avatar } from '@nextui-org/react'
import { secondsToHourMin } from '@utils/timeUtils'

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

  const totalWorkTime = activeTaskStep.task.steps[activeTaskStep.activeTaskStep].checklistItems?.reduce((acc, item) => {
    return acc + item.duration
  }, 0)
  const workedTime = activeTaskStep?.workedTime ? activeTaskStep?.workedTime : 0
  const progress = (workedTime / totalWorkTime) * 100

  return (
    <ItemContainer onClick={handleClick} borderRadius="0.3rem" margin="0 0 0.75rem 0">
      <JustifyBetweenRow>
        <Avatar
          size="md"
          pointer
          src={activeTaskStep.user.profile_img}
          text={activeTaskStep.user.firstname[0] + '' + activeTaskStep.user.lastname[0]}
          bordered
          stacked
          zoomed
          squared
          style={{ marginRight: '0.5rem' }}
        />
        <div
          style={{
            height: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center'
          }}
        >
          <ItemContainer margin="0 0 0.2rem 0">
            <JustifyBetweenRow>
              <Row>
                <H1 fontFamily="Satoshi-Light" width="auto" color={colors.text.primary}>
                  {activeTaskStep.task.name}
                </H1>
                <H1 fontFamily="Satoshi-Light" margin="0 0 0 0.25rem" color={colors.blue.primary} width="auto">
                  {activeTaskStep.task.steps[activeTaskStep.activeTaskStep].category.name}
                </H1>
              </Row>
              <H1 fontFamily="Satoshi-Light" width="200px" textAlign="end" color={colors.text.primary}>
                {secondsToHourMin(workedTime)} / {secondsToHourMin(totalWorkTime)}
              </H1>
            </JustifyBetweenRow>
          </ItemContainer>
          <ItemContainer>
            <ProgressBar completionPercentage={progress} completionColor={colors.blue.primary} />
          </ItemContainer>
        </div>
      </JustifyBetweenRow>
    </ItemContainer>
  )
}

export default TaskTrackingProgress
