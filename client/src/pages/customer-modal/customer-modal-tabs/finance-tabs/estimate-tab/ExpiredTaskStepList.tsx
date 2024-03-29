import React from 'react'
import { IExpiredTaskStep } from '@/models'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import colors from '@constants/colors'
import { H1 } from '@/components'
import styled from 'styled-components'
import JustifyBetweenRow from '../../../../../components/layout/JustifyBetweenRow'

interface IProps {
  expiredTaskSteps?: IExpiredTaskStep[]
}

const ExpiredItem = styled(JustifyBetweenRow)`
  padding: 0.2rem 1rem;
  border: 1px solid #e0e0e0;
  background: #d08989;
  margin-bottom: 0.5rem;
  border-radius: 5px;
  & h1 {
    font-size: 13px;
  }
`

const ExpiredTaskStepList: React.FC<IProps> = ({ expiredTaskSteps }) => {
  return (
    <Droppable key="expired" droppableId="expiredTaskSteps">
      {(provided, snapshot) => {
        return (
          <div
            style={{
              marginTop: '1rem',
              height: 170,
              maxHeight: 170,
              overflowY: 'auto',
              backgroundColor: snapshot.isDraggingOver ? colors.background.gray.light : 'transparent'
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {expiredTaskSteps?.map((step, index) => {
              return (
                <Draggable draggableId={step._id as string} index={index} key={step._id}>
                  {provided => {
                    return (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <ExpiredItem>
                          <H1 isEllipsis color={colors.black.primary}>
                            {step.task.name} - Step: {step.stepIndex + 1}
                          </H1>
                          <H1 width="fit-content" color={colors.black.primary} textAlign="end">
                            ${+Math.ceil(step.expiredTimePrice)}
                          </H1>
                        </ExpiredItem>
                      </div>
                    )
                  }}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>
        )
      }}
    </Droppable>
  )
}

export default ExpiredTaskStepList
