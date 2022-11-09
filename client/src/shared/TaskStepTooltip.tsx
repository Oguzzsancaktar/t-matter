import { Column, H1, ItemContainer, UserImage } from '@/components'
import colors from '@/constants/colors'
import { ETaskStatus, ICustomerTask, ITaskItem } from '@/models'
import { selectColorForTaskStatus } from '@/utils/statusColorUtil'
import moment from 'moment'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  task: ICustomerTask
  step: ITaskItem
}

const TooltipHeader = styled.div`
  width: 100%;
  height: 30px;
  border-radius: 5px 5px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 400;
  color: ${colors.text.primary};
  background-color: ${colors.gray.disabled};
  text-transform: uppercase;
  font-family: 'Satoshi-Medium';
`

const TooltipBody = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 400;
  color: ${colors.text.primary};
  background-color: ${colors.white.secondary};
  font-family: 'Satoshi-Medium';
`

const TooltipRow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TaskStepTooltip: React.FC<IProps> = ({ task, step }) => {
  console.log(task, step)
  return (
    <ItemContainer width="200px">
      <Column>
        <TooltipHeader>{task.name}</TooltipHeader>
        <TooltipBody>
          <ItemContainer width="100%" height="100%">
            <TooltipRow>
              <H1 textAlign="left" color={colors.text.primary} width="100%" fontSize="0.9rem">
                {moment(task.startDate).format('hh:mm A')}
              </H1>
              <H1 textAlign="right" color={selectColorForTaskStatus(task.status || 0)} width="100%" fontSize="0.9rem">
                {ETaskStatus[task.status || 0].replace('_', ' ')}
              </H1>
            </TooltipRow>
          </ItemContainer>
          <ItemContainer width="100%" height="100%" margin="0.7rem 0">
            <TooltipRow>
              <UserImage
                src={task.customer.profile_img}
                width="30px"
                padding="0"
                height="30px"
                margin="0 0.5rem 0 0 "
              />
              <H1 width="calc(100% - 0.5rem - 30px)" color={colors.text.primary} fontSize="0.8rem" height="100%">
                {task.customer.firstname + ' ' + task.customer.lastname}
              </H1>
            </TooltipRow>
          </ItemContainer>

          <ItemContainer width="100%" height="100%">
            <TooltipRow>
              <UserImage
                src={step.responsibleUser.profile_img}
                width="30px"
                padding="0"
                height="30px"
                margin="0 0.5rem 0 0 "
              />
              <H1 width="calc(100% - 0.5rem - 30px)" color={colors.text.primary} fontSize="0.8rem" height="100%">
                {step.responsibleUser.firstname + ' ' + step.responsibleUser.lastname}
              </H1>
            </TooltipRow>
          </ItemContainer>
        </TooltipBody>
      </Column>
    </ItemContainer>
  )
}

export default TaskStepTooltip
