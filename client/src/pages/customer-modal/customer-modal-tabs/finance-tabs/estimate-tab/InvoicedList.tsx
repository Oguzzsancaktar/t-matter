import React, { useEffect, useState } from 'react'
import { Invoice } from '@/models'
import { H1 } from '@/components'
import colors from '@constants/colors'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import JustifyBetweenRow from '@components/layout/JustifyBetweenRow'
import { ChevronDown, ChevronUp } from 'react-feather'

interface IProps {
  invoices?: Invoice[]
  openInvoice?: Invoice
}

const InvoiceItem = ({ invoice, isOpen: isInvoiceOpen }: { invoice: Invoice; isOpen: boolean }) => {
  const [isOpen, setIsOpen] = useState(isInvoiceOpen)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    setIsOpen(isInvoiceOpen)
  }, [isInvoiceOpen])

  return (
    <div
      style={{
        backgroundColor: '#add8e6',
        padding: '0.5rem 1rem',
        border: '1px solid #e0e0e0',
        marginBottom: '0.5rem',
        borderRadius: '5px'
      }}
    >
      <JustifyBetweenRow>
        <H1 color={colors.black.middle}>{invoice.category.name}</H1>
        <JustifyBetweenRow>
          <H1 color={colors.black.middle} textAlign="end">
            ${invoice.total?.toFixed(2)}
          </H1>
          {isOpen ? <ChevronUp size={28} onClick={handleToggle} /> : <ChevronDown size={28} onClick={handleToggle} />}
        </JustifyBetweenRow>
      </JustifyBetweenRow>
      {isOpen && (
        <>
          <hr style={{ margin: '0.5rem 0' }} />
          {invoice?.tasks?.map(task => {
            return (
              <JustifyBetweenRow margin="0 0 0.3rem 0">
                <H1 color={colors.black.middle}>{task.name}</H1>
                <H1 color={colors.black.middle} textAlign="end">
                  ${task.totalPrice?.toFixed(2)}
                </H1>
              </JustifyBetweenRow>
            )
          })}
          {invoice.expiredTaskSteps?.map(step => {
            return (
              <JustifyBetweenRow margin="0 0 0.3rem 0">
                <H1 color={colors.black.middle}>
                  {step.task.name} - Step: {step.stepIndex + 1}
                </H1>
                <H1 color={colors.black.middle} textAlign="end">
                  ${step.expiredTimePrice?.toFixed(2)}
                </H1>
              </JustifyBetweenRow>
            )
          })}
        </>
      )}
    </div>
  )
}

const InvoicedList: React.FC<IProps> = ({ invoices, openInvoice }) => {
  return (
    <Droppable key="invoiced" droppableId="invoicedTasks">
      {(provided, snapshot) => {
        return (
          <div
            style={{
              marginTop: '1rem',
              height: 425,
              maxHeight: 425,
              overflowY: 'auto',
              backgroundColor: snapshot.isDraggingOver ? colors.background.gray.light : 'transparent'
            }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {invoices?.map((invoice, index) => {
              return (
                <Draggable draggableId={invoice._id as string} index={index} key={invoice._id}>
                  {provided => {
                    return (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <InvoiceItem isOpen={openInvoice?._id === invoice._id} invoice={invoice} />
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

export default InvoicedList
