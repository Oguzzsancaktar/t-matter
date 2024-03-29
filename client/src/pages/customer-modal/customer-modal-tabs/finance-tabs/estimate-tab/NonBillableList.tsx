import React from 'react'
import { H1 } from '@/components'
import { ICustomerTask } from '@/models'
import styled from 'styled-components'
import colors from '@constants/colors'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import JustifyBetweenRow from '@components/layout/JustifyBetweenRow'

interface IProps {
  nonBillableTasks?: ICustomerTask[]
}

const Item = styled(JustifyBetweenRow)`
  padding: 0.2rem 1rem;
  border: 1px solid #e0e0e0;
  background: #e0e0e0;
  margin-bottom: 0.5rem;
  border-radius: 5px;
  & h1 {
    font-size: 13px;
  }
`

const NonBillableList: React.FC<IProps> = ({ nonBillableTasks }) => {
  return (
    <Droppable key="non" droppableId="nonBillableTasks">
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
            {nonBillableTasks?.map((task, index) => {
              return (
                <Draggable draggableId={task._id as string} index={index} key={task._id}>
                  {provided => {
                    return (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Item>
                          <H1 isEllipsis color={colors.black.primary}>
                            {task.name}
                          </H1>
                          <H1 width="fit-content" color={colors.black.primary} textAlign="end">
                            ${+Math.ceil(task.totalPrice || 0)}
                          </H1>
                        </Item>
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
export default NonBillableList
