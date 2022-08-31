import React from 'react'
import { ICustomerTask } from '@/models'
import { H1 } from '@/components'
import colors from '@constants/colors'
import styled from 'styled-components'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import JustifyBetweenRow from '@components/layout/JustifyBetweenRow'

interface IProps {
  createInvoiceTasks?: ICustomerTask[]
}

const Item = styled(JustifyBetweenRow)`
  padding: 0.5rem 1rem;
  border: 1px solid #e0e0e0;
  background: ${colors.background.gray.light};
  margin-bottom: 0.5rem;
`

const CreateInvoiceList: React.FC<IProps> = ({ createInvoiceTasks }) => {
  return (
    <Droppable key="create" droppableId="createInvoiceTasks">
      {(provided, snapshot) => {
        return (
          <div
            style={{
              marginTop: '1rem',
              height: '43%',
              backgroundColor: snapshot.isDraggingOver ? colors.background.gray.light : 'transparent'
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {createInvoiceTasks?.map((task, index) => {
              return (
                <Draggable draggableId={task._id as string} index={index} key={task._id}>
                  {provided => {
                    return (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Item>
                          <H1 color={colors.black.primary}>{task.name}</H1>
                          <H1 color={colors.black.primary} textAlign="end">
                            ${task.totalPrice?.toFixed(2)}
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

export default CreateInvoiceList
